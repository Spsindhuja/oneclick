-- Create applications table for storing off-chain metadata
CREATE TABLE public.applications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    institution TEXT NOT NULL,
    description TEXT,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_address TEXT,
    phone_number TEXT,
    graduation_date DATE,
    student_id TEXT,
    gpa DECIMAL(3,2),
    additional_info JSONB DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ai-checking', 'under-review', 'approved', 'rejected')),
    blockchain_tx_hash TEXT,
    blockchain_address TEXT,
    documents_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create AI analysis results table
CREATE TABLE public.ai_analysis (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    ocr_results JSONB DEFAULT '{}',
    document_authenticity_score DECIMAL(3,2),
    forgery_indicators JSONB DEFAULT '[]',
    eligibility_match_score DECIMAL(3,2),
    missing_information TEXT[],
    confidence_level DECIMAL(3,2),
    ai_recommendation TEXT CHECK (ai_recommendation IN ('approve', 'reject', 'flag_for_review')),
    analysis_details JSONB DEFAULT '{}',
    processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create document metadata table
CREATE TABLE public.documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    ipfs_hash TEXT,
    arweave_hash TEXT,
    document_type TEXT NOT NULL CHECK (document_type IN ('transcript', 'diploma', 'certificate', 'id_document', 'other')),
    upload_status TEXT DEFAULT 'pending' CHECK (upload_status IN ('pending', 'uploading', 'uploaded', 'failed')),
    metadata JSONB DEFAULT '{}',
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create validator votes table
CREATE TABLE public.validator_votes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    validator_address TEXT NOT NULL,
    vote TEXT NOT NULL CHECK (vote IN ('approve', 'reject', 'flag')),
    reasoning TEXT,
    stake_amount DECIMAL(20,0),
    vote_weight DECIMAL(10,4),
    voted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    blockchain_tx_hash TEXT,
    UNIQUE(application_id, validator_address)
);

-- Create rejection analysis table
CREATE TABLE public.rejection_analysis (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    rejection_reason TEXT NOT NULL CHECK (rejection_reason IN ('forged_documents', 'tampered_documents', 'missing_information', 'eligibility_mismatch', 'invalid_documents')),
    detailed_analysis TEXT NOT NULL,
    evidence JSONB DEFAULT '{}',
    can_resubmit BOOLEAN DEFAULT true,
    can_appeal BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create NFT certificates table
CREATE TABLE public.nft_certificates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    token_address TEXT NOT NULL,
    token_id TEXT NOT NULL,
    metadata_uri TEXT,
    certificate_data JSONB NOT NULL,
    minted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    blockchain_tx_hash TEXT NOT NULL,
    UNIQUE(token_address, token_id)
);

-- Create user notifications table
CREATE TABLE public.notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('status_update', 'ai_complete', 'voting_complete', 'certificate_ready', 'rejection_notice')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    email_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system analytics table for dashboard queries
CREATE TABLE public.analytics_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    user_id UUID,
    application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
    validator_address TEXT,
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validator_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rejection_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nft_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for applications
CREATE POLICY "Users can view their own applications" 
ON public.applications 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own applications" 
ON public.applications 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Validators can view all applications for reviewing (simplified for now - should check validator role)
CREATE POLICY "Validators can view all applications" 
ON public.applications 
FOR SELECT 
USING (true);

-- Create RLS policies for AI analysis (read-only for users)
CREATE POLICY "Users can view AI analysis of their applications" 
ON public.ai_analysis 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = ai_analysis.application_id 
  AND applications.user_id::text = auth.uid()::text
));

CREATE POLICY "System can manage AI analysis" 
ON public.ai_analysis 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create RLS policies for documents
CREATE POLICY "Users can manage documents of their applications" 
ON public.documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = documents.application_id 
  AND applications.user_id::text = auth.uid()::text
));

-- Create RLS policies for validator votes
CREATE POLICY "Validators can manage their own votes" 
ON public.validator_votes 
FOR ALL 
USING (validator_address = auth.uid()::text);

CREATE POLICY "Users can view votes on their applications" 
ON public.validator_votes 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = validator_votes.application_id 
  AND applications.user_id::text = auth.uid()::text
));

-- Create RLS policies for rejection analysis
CREATE POLICY "Users can view rejection analysis of their applications" 
ON public.rejection_analysis 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = rejection_analysis.application_id 
  AND applications.user_id::text = auth.uid()::text
));

-- Create RLS policies for NFT certificates
CREATE POLICY "Users can view certificates of their applications" 
ON public.nft_certificates 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = nft_certificates.application_id 
  AND applications.user_id::text = auth.uid()::text
));

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Create indexes for better performance
CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_created_at ON public.applications(created_at);
CREATE INDEX idx_ai_analysis_application_id ON public.ai_analysis(application_id);
CREATE INDEX idx_documents_application_id ON public.documents(application_id);
CREATE INDEX idx_validator_votes_application_id ON public.validator_votes(application_id);
CREATE INDEX idx_validator_votes_validator ON public.validator_votes(validator_address);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, read_at);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
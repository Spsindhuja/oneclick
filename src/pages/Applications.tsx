import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { StatusBadge, ApplicationStatus } from "@/components/StatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  Calendar, 
  Building, 
  User,
  Award,
  AlertTriangle,
  RefreshCw,
  Download,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  title: string;
  institution: string;
  applicant_name: string;
  applicant_email: string;
  status: ApplicationStatus;
  documents_count: number;
  created_at: string;
  submitted_at: string;
  blockchain_tx_hash?: string;
  description?: string;
}

interface RejectionAnalysis {
  rejection_reason: string;
  detailed_analysis: string;
  can_resubmit: boolean;
  can_appeal: boolean;
}

interface NFTCertificate {
  token_address: string;
  token_id: string;
  metadata_uri: string;
  minted_at: string;
}

export const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectionAnalysis, setRejectionAnalysis] = useState<{[key: string]: RejectionAnalysis}>({});
  const [nftCertificates, setNftCertificates] = useState<{[key: string]: NFTCertificate}>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
      
      // Fetch rejection analysis for rejected applications
      const rejectedApps = data?.filter(app => app.status === 'rejected') || [];
      if (rejectedApps.length > 0) {
        const { data: rejectionData } = await supabase
          .from('rejection_analysis')
          .select('*')
          .in('application_id', rejectedApps.map(app => app.id));
        
        const rejectionMap: {[key: string]: RejectionAnalysis} = {};
        rejectionData?.forEach(analysis => {
          rejectionMap[analysis.application_id] = analysis;
        });
        setRejectionAnalysis(rejectionMap);
      }

      // Fetch NFT certificates for approved applications
      const approvedApps = data?.filter(app => app.status === 'approved') || [];
      if (approvedApps.length > 0) {
        const { data: nftData } = await supabase
          .from('nft_certificates')
          .select('*')
          .in('application_id', approvedApps.map(app => app.id));
        
        const nftMap: {[key: string]: NFTCertificate} = {};
        nftData?.forEach(cert => {
          nftMap[cert.application_id] = cert;
        });
        setNftCertificates(nftMap);
      }

    } catch (error: any) {
      toast({
        title: "Error fetching applications",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRejectionReasonLabel = (reason: string) => {
    const reasons: {[key: string]: string} = {
      'forged_documents': 'Forged Documents',
      'tampered_documents': 'Tampered Documents', 
      'missing_information': 'Missing Information',
      'eligibility_mismatch': 'Eligibility Mismatch',
      'invalid_documents': 'Invalid Documents'
    };
    return reasons[reason] || reason;
  };

  const handleResubmit = (applicationId: string) => {
    toast({
      title: "Resubmission Started",
      description: "You can now update your application with the required changes.",
    });
    // TODO: Navigate to edit application or open resubmission modal
  };

  const handleAppeal = (applicationId: string) => {
    toast({
      title: "Appeal Process Started",
      description: "Your appeal has been submitted for review.",
    });
    // TODO: Open appeal modal or navigate to appeal form
  };

  const handleDownloadNFT = (certificate: NFTCertificate) => {
    toast({
      title: "Downloading Certificate",
      description: "Your NFT certificate is being prepared for download.",
    });
    // TODO: Implement NFT certificate download
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation isConnected={true} userType="applicant" />
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading applications...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isConnected={true} userType="applicant" />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track and manage your educational credential verification requests
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.length === 0 ? (
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any credential verification requests yet.
                </p>
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Submit Your First Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            applications.map((app) => (
              <Card key={app.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{app.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {app.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {app.applicant_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(app.submitted_at)}
                        </span>
                      </CardDescription>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Application Details */}
                    {app.description && (
                      <p className="text-sm text-muted-foreground">{app.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">
                        {app.documents_count} documents
                      </Badge>
                      {app.blockchain_tx_hash && (
                        <Badge variant="outline" className="font-mono text-xs">
                          TX: {app.blockchain_tx_hash.slice(0, 8)}...
                        </Badge>
                      )}
                    </div>

                    {/* Rejection Analysis */}
                    {app.status === 'rejected' && rejectionAnalysis[app.id] && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="font-medium text-destructive">
                            Rejection Reason: {getRejectionReasonLabel(rejectionAnalysis[app.id].rejection_reason)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {rejectionAnalysis[app.id].detailed_analysis}
                        </p>
                        <div className="flex gap-2">
                          {rejectionAnalysis[app.id].can_resubmit && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleResubmit(app.id)}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Resubmit
                            </Button>
                          )}
                          {rejectionAnalysis[app.id].can_appeal && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAppeal(app.id)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Appeal
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* NFT Certificate */}
                    {app.status === 'approved' && nftCertificates[app.id] && (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="w-4 h-4 text-success" />
                              <span className="font-medium text-success">
                                NFT Certificate Ready
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                              Token ID: {nftCertificates[app.id].token_id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Minted: {formatDate(nftCertificates[app.id].minted_at)}
                            </p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-gradient-primary hover:shadow-glow"
                            onClick={() => handleDownloadNFT(nftCertificates[app.id])}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
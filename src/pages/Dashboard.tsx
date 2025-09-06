import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import { StatusBadge, ApplicationStatus } from "@/components/StatusBadge";
import { 
  Upload, 
  FileText, 
  Camera, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  title: string;
  institution: string;
  submittedAt: string;
  status: ApplicationStatus;
  documents: number;
}

const mockApplications: Application[] = [
  {
    id: "1",
    title: "Bachelor of Computer Science",
    institution: "Stanford University",
    submittedAt: "2024-01-15",
    status: "approved",
    documents: 3,
  },
  {
    id: "2", 
    title: "Master of Business Administration",
    institution: "Harvard Business School",
    submittedAt: "2024-01-20",
    status: "under-review",
    documents: 5,
  },
  {
    id: "3",
    title: "Data Science Certificate",
    institution: "MIT",
    submittedAt: "2024-01-25",
    status: "ai-checking",
    documents: 2,
  },
];

export const Dashboard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applications] = useState<Application[]>(mockApplications);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "Your credentials are now being processed by our AI system.",
      });
    }, 2000);
  };

  const stats = [
    {
      label: "Total Applications",
      value: applications.length.toString(),
      icon: FileText,
      trend: "+2 this month",
    },
    {
      label: "Approved",
      value: applications.filter(app => app.status === "approved").length.toString(),
      icon: CheckCircle,
      trend: "100% success rate",
    },
    {
      label: "In Progress",
      value: applications.filter(app => ["pending", "ai-checking", "under-review"].includes(app.status)).length.toString(),
      icon: Clock,
      trend: "Avg 2.4 hrs",
    },
    {
      label: "NFT Certificates",
      value: applications.filter(app => app.status === "approved").length.toString(),
      icon: Award,
      trend: "Ready to download",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isConnected={true} userType="applicant" />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Application Dashboard</h1>
          <p className="text-muted-foreground">
            Submit and track your educational credential verification requests
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                  <div className="text-xs text-success">{stat.trend}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* New Application Form */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Submit New Application
              </CardTitle>
              <CardDescription>
                Upload your educational documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="credential-title">Credential Title</Label>
                  <Input 
                    id="credential-title"
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input 
                    id="institution"
                    placeholder="e.g., Stanford University"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description"
                    placeholder="Additional details about your credential..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your documents here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported: PDF, JPG, PNG (Max 10MB each)
                    </p>
                    <Button type="button" variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Applications
              </CardTitle>
              <CardDescription>
                Track the status of your submitted credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div 
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{app.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{app.institution}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Submitted: {app.submittedAt}</span>
                        <span>{app.documents} documents</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={app.status} />
                      {app.status === "approved" && (
                        <Button size="sm" variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          View NFT
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {applications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No applications yet</p>
                    <p className="text-sm">Submit your first credential for verification</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
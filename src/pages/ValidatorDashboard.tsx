import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { StatusBadge, ApplicationStatus } from "@/components/StatusBadge";
import { 
  Shield, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  Coins,
  TrendingUp,
  FileText,
  Bot,
  Users,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ValidationApplication {
  id: string;
  title: string;
  institution: string;
  applicant: string;
  submittedAt: string;
  status: ApplicationStatus;
  aiScore: number;
  aiFlags: string[];
  documents: number;
  validatorVotes: {
    approve: number;
    reject: number;
    flag: number;
  };
  consensusNeeded: number;
}

const mockApplications: ValidationApplication[] = [
  {
    id: "1",
    title: "Master of Data Science",
    institution: "UC Berkeley",
    applicant: "0x1234...5678",
    submittedAt: "2024-01-25",
    status: "under-review",
    aiScore: 0.92,
    aiFlags: [],
    documents: 4,
    validatorVotes: { approve: 2, reject: 0, flag: 0 },
    consensusNeeded: 3,
  },
  {
    id: "2",
    title: "Bachelor of Engineering",
    institution: "MIT",
    applicant: "0x9876...4321",
    submittedAt: "2024-01-24",
    status: "under-review",
    aiScore: 0.76,
    aiFlags: ["Document quality concerns", "Minor inconsistency in dates"],
    documents: 3,
    validatorVotes: { approve: 1, reject: 1, flag: 1 },
    consensusNeeded: 3,
  },
];

export const ValidatorDashboard = () => {
  const [applications] = useState<ValidationApplication[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<ValidationApplication | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  const handleVote = async (appId: string, vote: 'approve' | 'reject' | 'flag') => {
    setIsVoting(true);
    
    // Simulate voting
    setTimeout(() => {
      setIsVoting(false);
      toast({
        title: "Vote Submitted!",
        description: `Your ${vote} vote has been recorded on the blockchain.`,
      });
    }, 1500);
  };

  const validatorStats = [
    {
      label: "Total Reviews",
      value: "147",
      icon: FileText,
      trend: "+12 this week",
    },
    {
      label: "Accuracy Rate",
      value: "98.3%",
      icon: TrendingUp,
      trend: "Above average",
    },
    {
      label: "Rewards Earned",
      value: "2,340 APT",
      icon: Coins,
      trend: "+156 this month",
    },
    {
      label: "Validator Rank",
      value: "#23",
      icon: Shield,
      trend: "Top 5%",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isConnected={true} userType="validator" />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Validator Dashboard
          </h1>
          <p className="text-muted-foreground">
            Review credential applications and earn rewards for accurate validation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {validatorStats.map((stat, index) => {
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

        <Tabs defaultValue="review-queue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="review-queue">Review Queue</TabsTrigger>
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="consensus">Consensus Tracking</TabsTrigger>
          </TabsList>

          {/* Review Queue */}
          <TabsContent value="review-queue" className="space-y-4">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Applications Awaiting Review
                </CardTitle>
                <CardDescription>
                  Review AI-analyzed applications and cast your validation vote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="border hover:shadow-card-hover transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{app.title}</h4>
                            <p className="text-muted-foreground mb-2">{app.institution}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Applicant: {app.applicant}</span>
                              <span>•</span>
                              <span>Submitted: {app.submittedAt}</span>
                              <span>•</span>
                              <span>{app.documents} documents</span>
                            </div>
                          </div>
                          <StatusBadge status={app.status} />
                        </div>

                        {/* AI Analysis */}
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Bot className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">AI Analysis</span>
                            <Badge variant="outline" className={`ml-auto ${
                              app.aiScore >= 0.9 ? 'text-success border-success/20' :
                              app.aiScore >= 0.7 ? 'text-warning border-warning/20' :
                              'text-destructive border-destructive/20'
                            }`}>
                              Score: {(app.aiScore * 100).toFixed(0)}%
                            </Badge>
                          </div>
                          
                          {app.aiFlags.length > 0 ? (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-warning flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Flags Detected:
                              </p>
                              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                                {app.aiFlags.map((flag, index) => (
                                  <li key={index} className="list-disc">{flag}</li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-sm text-success flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              No issues detected by AI analysis
                            </p>
                          )}
                        </div>

                        {/* Voting Section */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Votes:</span>
                              <Badge variant="outline" className="text-success border-success/20">
                                ✓ {app.validatorVotes.approve}
                              </Badge>
                              <Badge variant="outline" className="text-destructive border-destructive/20">
                                ✗ {app.validatorVotes.reject}
                              </Badge>
                              <Badge variant="outline" className="text-warning border-warning/20">
                                ⚠ {app.validatorVotes.flag}
                              </Badge>
                              <span className="text-muted-foreground">
                                ({app.consensusNeeded - app.validatorVotes.approve - app.validatorVotes.reject - app.validatorVotes.flag} needed)
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedApp(app)}
                              className="border-primary/20 hover:bg-primary/5"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleVote(app.id, 'approve')}
                              disabled={isVoting}
                              className="bg-success hover:bg-success/90 text-success-foreground"
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVote(app.id, 'reject')}
                              disabled={isVoting}
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVote(app.id, 'flag')}
                              disabled={isVoting}
                              className="border-warning/20 text-warning hover:bg-warning/10"
                            >
                              <Flag className="w-4 h-4 mr-1" />
                              Flag
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Reviews */}
          <TabsContent value="my-reviews">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>My Recent Reviews</CardTitle>
                <CardDescription>
                  Track your validation history and accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Review history will appear here</p>
                  <p className="text-sm">Complete some validations to see your track record</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consensus Tracking */}
          <TabsContent value="consensus">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Consensus Tracking</CardTitle>
                <CardDescription>
                  Monitor validation consensus and network decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Consensus data will appear here</p>
                  <p className="text-sm">Track how the validator network reaches decisions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
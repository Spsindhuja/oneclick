import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { 
  Shield, 
  FileCheck, 
  Award, 
  Users, 
  Zap, 
  Lock,
  ArrowRight,
  CheckCircle,
  Bot,
  Coins
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Validation",
    description: "Advanced OCR and document analysis to detect forged credentials and verify authenticity",
  },
  {
    icon: Shield,
    title: "Decentralized Security",
    description: "Built on Aptos blockchain for tamper-proof verification and immutable record keeping",
  },
  {
    icon: Award,
    title: "NFT Certificates",
    description: "Approved credentials are minted as NFTs, providing permanent digital proof of achievements",
  },
  {
    icon: Users,
    title: "Validator Network",
    description: "Community-driven validation through a network of verified education professionals",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Fast processing with AI pre-screening and efficient validator consensus mechanisms",
  },
  {
    icon: Coins,
    title: "Token Incentives",
    description: "Validators earn rewards for accurate reviews, ensuring high-quality validation services",
  },
];

const stats = [
  { label: "Credentials Verified", value: "50,000+" },
  { label: "Active Validators", value: "1,200+" },
  { label: "Success Rate", value: "99.7%" },
  { label: "Average Processing Time", value: "2.4 hrs" },
];

const howItWorks = [
  {
    step: "1",
    title: "Connect Wallet",
    description: "Link your Aptos wallet to securely access the platform",
  },
  {
    step: "2",
    title: "Submit Documents",
    description: "Upload your educational certificates and transcripts",
  },
  {
    step: "3",
    title: "AI Analysis",
    description: "Our AI system performs initial document verification",
  },
  {
    step: "4",
    title: "Validator Review",
    description: "Expert validators review and vote on your submission",
  },
  {
    step: "5",
    title: "Get NFT Certificate",
    description: "Receive your verified credential as a blockchain NFT",
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
              Decentralized Education
              <br />
              Credential Validation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Secure, AI-powered verification of educational credentials on the Aptos blockchain. 
              Combat credential fraud with decentralized validation and NFT certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Start Verification
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/validator">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  Become a Validator
                  <Shield className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose EduChain?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets educational integrity in our comprehensive validation platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your educational credentials verified and secured on the blockchain
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="bg-gradient-accent text-accent-foreground shadow-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Verify Your Credentials?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of students and professionals who trust EduChain 
                for secure, decentralized credential verification.
              </p>
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-white text-accent hover:bg-white/90 shadow-lg"
                >
                  Get Started Now
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-accent bg-clip-text text-transparent">
                EduChain Validator
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Built on Aptos</span>
              <span>•</span>
              <span>Secured by Web3</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Shield, Zap } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  description: string;
  available: boolean;
}

const walletOptions: WalletOption[] = [
  {
    name: "Petra Wallet",
    icon: "🟠",
    description: "The most popular Aptos wallet",
    available: true,
  },
  {
    name: "Martian Wallet",
    icon: "🔴",
    description: "Multi-chain wallet with Aptos support",
    available: true,
  },
  {
    name: "Fewcha Wallet",
    icon: "🟣",
    description: "Secure Aptos wallet extension",
    available: true,
  },
];

interface WalletConnectProps {
  onConnect?: (wallet: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>("");

  const handleConnect = async (walletName: string) => {
    setIsConnecting(walletName);
    
    // Simulate wallet connection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      setConnectedWallet(walletName);
      onConnect?.(walletName);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectedWallet("");
  };

  if (isConnected) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">{connectedWallet}</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDisconnect}
              className="border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Connect Your Aptos Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to EduChain Validator
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <Card 
              key={wallet.name}
              className="cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] bg-gradient-card"
              onClick={() => handleConnect(wallet.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">{wallet.name}</p>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                  {isConnecting === wallet.name ? (
                    <div className="flex items-center gap-2 text-primary">
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">Connecting...</span>
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Shield className="w-4 h-4" />
          <span>Your wallet credentials are stored securely on your device</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertTriangle, Eye, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export type ApplicationStatus = 
  | "pending" 
  | "ai-checking" 
  | "under-review" 
  | "approved" 
  | "rejected" 
  | "flagged";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
  },
  "ai-checking": {
    label: "AI Checking",
    icon: Bot,
    className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 animate-pulse",
  },
  "under-review": {
    label: "Under Review",
    icon: Eye,
    className: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
  },
  flagged: {
    label: "Flagged",
    icon: AlertTriangle,
    className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};
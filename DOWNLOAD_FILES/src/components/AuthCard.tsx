import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className={cn("gradient-card shadow-glow border-border/50", className)}>
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children}
          </CardContent>
        </Card>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Assignment by <span className="font-semibold text-primary">punithpindi</span></p>
        </div>
      </div>
    </div>
  );
}
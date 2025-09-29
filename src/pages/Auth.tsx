import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
}

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${user.name}`,
      });
      onLogin({ name: user.name, email: user.email });
    } else {
      // Demo login for better UX
      if (email === "demo@example.com" && password === "demo123") {
        const demoUser = { name: "Demo User", email: "demo@example.com" };
        toast({
          title: "Welcome!",
          description: "Successfully logged in with demo account",
        });
        onLogin(demoUser);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try demo@example.com / demo123",
          variant: "destructive",
        });
      }
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists",
        variant: "destructive",
      });
      return;
    }

    // Save user to localStorage (in real app, this would be backend)
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast({
      title: "Account Created!",
      description: "Your account has been created successfully",
    });

    // Auto login after registration
    onLogin({ name, email });
  };

  return (
    <AuthCard
      title={isLogin ? "Welcome Back" : "Create Account"}
      description={isLogin ? "Sign in to your account" : "Get started with your new account"}
    >
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
      
      {isLogin && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground text-center">
          <p className="font-medium mb-1">Demo Account</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      )}
    </AuthCard>
  );
}
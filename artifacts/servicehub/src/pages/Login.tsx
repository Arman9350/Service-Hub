import { useState } from "react";
import { Link, useLocation } from "wouter";
// import { useLoginUser } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const role = email === "admin@servicehub.com" ? "admin" : "user";
      localStorage.setItem("user", JSON.stringify({ email, role }));
      window.dispatchEvent(new Event("auth-change"));
      toast({ title: "Logged in successfully" });
      setLocation("/");
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary font-bold text-2xl cursor-pointer">
              <Zap className="h-6 w-6" />
              <span>ServiceHub</span>
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full h-12 text-lg mt-4">Log In</Button>
        </form>
        <div className="text-center mt-6 text-slate-600">
          Don't have an account? <Link href="/register"><span className="text-primary hover:underline cursor-pointer">Sign up</span></Link>
        </div>
      </div>
    </div>
  );
}

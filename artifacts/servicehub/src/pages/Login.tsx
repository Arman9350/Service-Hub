import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wrench } from "lucide-react";

const DEMO_PROVIDERS: Record<string, { name: string; providerId: number }> = {
  "ramesh@provider.com":    { name: "Ramesh Electricals",  providerId: 1 },
  "sunil@provider.com":     { name: "Sunil Plumbing Works", providerId: 2 },
  "krishna@provider.com":   { name: "Krishna Carpentry",    providerId: 3 },
  "coolair@provider.com":   { name: "CoolAir AC Services",  providerId: 4 },
  "meena@provider.com":     { name: "Prof. Meena Gupta",    providerId: 5 },
  "ajay@provider.com":      { name: "Ajay Auto Care",       providerId: 6 },
  "glamour@provider.com":   { name: "Glamour Studio",       providerId: 7 },
  "speedy@provider.com":    { name: "SpeedyDeliver",        providerId: 8 },
  "techfreelance@provider.com": { name: "TechFreelance Hub", providerId: 9 },
};

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@servicehub.com") {
        localStorage.setItem("user", JSON.stringify({ name: "Admin User", email, role: "admin" }));
      } else if (DEMO_PROVIDERS[email]) {
        const p = DEMO_PROVIDERS[email];
        localStorage.setItem("user", JSON.stringify({ name: p.name, email, role: "provider", providerId: p.providerId }));
      } else {
        const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        localStorage.setItem("user", JSON.stringify({ name, email, role: "user" }));
      }
      window.dispatchEvent(new Event("auth-change"));
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      setLocation("/");
    }, 500);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary font-bold text-2xl cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span>ServiceHub</span>
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-center text-slate-500 text-sm mb-6">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full h-12 text-base mt-4" disabled={loading}>
            {loading ? "Signing in…" : "Log In"}
          </Button>
        </form>

        {/* Demo accounts hint */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Demo Accounts (any password)</p>
          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex justify-between"><span>👤 User</span><span className="font-mono">user@example.com</span></div>
            <div className="flex justify-between"><span>🔧 Provider</span><span className="font-mono">ramesh@provider.com</span></div>
            <div className="flex justify-between"><span>🛡️ Admin</span><span className="font-mono">admin@servicehub.com</span></div>
          </div>
        </div>

        <div className="text-center mt-4 text-slate-600 text-sm">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-primary hover:underline cursor-pointer">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

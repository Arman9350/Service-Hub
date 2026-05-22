import { Link } from "wouter";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-slate-700">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">ServiceHub</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              The neighborhood notice board gone digital. Connecting people with trusted local service providers since 2024.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/providers"><span className="hover:text-primary transition-colors cursor-pointer">Find Services</span></Link></li>
              <li><Link href="/login"><span className="hover:text-primary transition-colors cursor-pointer">Login</span></Link></li>
              <li><Link href="/register"><span className="hover:text-primary transition-colors cursor-pointer">Register</span></Link></li>
              <li><Link href="/admin"><span className="hover:text-primary transition-colors cursor-pointer">Admin Dashboard</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Electrician", "Plumber", "Carpenter", "AC Repair", "Tutor", "Mechanic"].map((s) => (
                <li key={s}>
                  <Link href="/providers">
                    <span className="hover:text-primary transition-colors cursor-pointer">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>ServiceHub — Smart Local Service Provider Platform</p>
          <p>Built with React, Node.js &amp; PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}

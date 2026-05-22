import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Wrench } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/providers", label: "Find Services" },
    { href: "/admin", label: "Admin" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="logo">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">ServiceHub</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location === l.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {l.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" data-testid="button-login">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" data-testid="button-register">Register</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          data-testid="button-mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span
                className="block text-sm font-medium py-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </span>
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setOpen(false)}>Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="flex-1" onClick={() => setOpen(false)}>Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

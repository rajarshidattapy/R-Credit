import { Link } from "react-router-dom";
import { Shield, Github, FileText, Info, ExternalLink, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background relative" style={{ borderColor: "hsla(200, 100%, 60%, 0.1)" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient neon-glow">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient-hero">R</span>
                <span className="text-foreground">-Credit</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              Trust-based lending protocol where credit is tied to identity, not wallets. 
              Build your reputation, borrow securely.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <Zap className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Hackathon Demo</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-primary">Protocol</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/borrow-lend" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  Borrow & Lend
                </Link>
              </li>
              <li>
                <Link to="/vault" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-primary">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "hsla(200, 100%, 60%, 0.1)" }}>
          <p className="text-xs text-muted-foreground">
            © 2024 R-Credit. Built for demonstration purposes.
          </p>
          <p className="text-xs text-muted-foreground">
            This is a hackathon demo. Not for production use.
          </p>
        </div>
      </div>
    </footer>
  );
}
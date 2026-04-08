import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16",
        "glass-effect border-b border-white/[0.08]",
        "flex items-center justify-between px-6 md:px-10",
      )}
      data-ocid="main-header"
    >
      {/* Logo */}
      <Link to="/" aria-label="Jodex Production home" data-ocid="logo-link">
        <img
          src="/assets/images/logo.jpeg"
          alt="Jodex Production logo"
          className={cn(
            "w-12 h-12 rounded-full object-cover",
            "border-2 border-cyan-400/60 ring-2 ring-cyan-400/30",
            "transition-smooth hover:border-cyan-400 hover:ring-cyan-400/50",
            "shadow-[0_0_12px_rgba(34,211,238,0.3)]",
          )}
          data-ocid="logo-image"
        />
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-6" data-ocid="main-nav">
        <Link
          to="/terms"
          className={cn(
            "text-sm font-display font-medium tracking-wider uppercase",
            "text-foreground/70 transition-smooth",
            "hover:text-primary hover:text-glow",
          )}
          data-ocid="nav-terms"
        >
          Terms &amp; Conditions
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="relative z-10 border-t border-white/[0.06] bg-card/30 py-8 px-6 md:px-10"
      data-ocid="main-footer"
    >
      {/* Branding row */}
      <div className="text-center mb-6">
        <p className="font-display font-bold text-lg text-foreground/90 tracking-widest uppercase">
          Jodex Production
        </p>
        <p className="text-xs text-foreground/30 tracking-[0.2em] uppercase mt-1 font-mono">
          3D Animation · 2D Animation · Video Editing · Interior Design
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground border-t border-white/[0.04] pt-5">
        <span>
          © 2028 JODEX PRODUCTION &mdash;{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </span>

        <Link
          to="/admin/login"
          className="text-foreground/20 hover:text-foreground/50 transition-smooth text-[11px] tracking-widest uppercase"
          data-ocid="footer-admin-link"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16" data-ocid="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

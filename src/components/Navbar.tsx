import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Get Involved", path: "/get-involved" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Trap scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav
        className="container-narrow flex h-16 items-center justify-between px-4 md:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          aria-label="Utkrast Foundation – Home"
        >
          <Heart className="h-6 w-6 fill-accent text-accent" aria-hidden="true" />
          <span>Utkrast Foundation</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                role="listitem"
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "bg-secondary text-primary font-semibold" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link to="/donate" className="ml-3 group">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden ring-offset-background focus-visible:ring-2 focus-visible:ring-accent">
              <span className="relative z-10 flex items-center gap-2">
                Donate Now
                <Heart className="h-4 w-4 transition-transform group-hover:scale-125 group-hover:fill-current" />
              </span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 rounded-md focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`border-t border-border bg-card lg:hidden transition-all duration-200 ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "bg-secondary text-primary font-semibold" : "text-muted-foreground hover:bg-secondary"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link to="/donate" tabIndex={mobileOpen ? 0 : -1}>
            <Button className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

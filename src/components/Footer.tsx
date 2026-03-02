import { Link } from "react-router-dom";
import { Heart, Mail, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground" aria-label="Site footer">
      <div className="container-narrow section-padding pb-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-4">
              <Heart className="h-5 w-5 fill-accent text-accent" aria-hidden="true" />
              <span>Utkrast Foundation</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Empowering underprivileged women and children through education, skill development,
              and livelihood opportunities across India.
            </p>
            <p className="mt-3 text-sm text-primary-foreground/60">
              Founded by <strong className="text-primary-foreground/80">Sadrun Nisha</strong> &amp;{" "}
              <strong className="text-primary-foreground/80">Safia Parveen</strong>
            </p>
          </div>

          <nav aria-label="Quick links">
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              {[
                { to: "/about", label: "About Us" },
                { to: "/programs", label: "Programs" },
                { to: "/get-involved", label: "Get Involved" },
                { to: "/donate", label: "Donate" },
                { to: "/gallery", label: "Gallery" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-colors focus-visible:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2 className="font-semibold mb-4">Programs</h2>
            <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <li><Link to="/programs/skill-development" className="hover:text-accent transition-colors">Women's Skill Development</Link></li>
              <li><Link to="/programs/education-support" className="hover:text-accent transition-colors">Children's Education</Link></li>
              <li><Link to="/programs/livelihood-training" className="hover:text-accent transition-colors">Livelihood Training</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-4">Connect With Us</h2>
            <address className="not-italic flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a
                href="mailto:utkrastfoundation61@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                utkrastfoundation61@gmail.com
              </a>
              <a
                href="https://www.instagram.com/utkrast_foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                @utkrast_foundation
              </a>
            </address>
          </div>

        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/50">
          © {year} Utkrast Foundation. All rights reserved. Made with{" "}
          <Heart className="inline h-3.5 w-3.5 fill-accent text-accent mx-0.5" aria-label="love" />
          for a better India.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

const CTASection = ({ title, description, primaryLabel, primaryLink, secondaryLabel, secondaryLink }: CTASectionProps) => {
  return (
    <section className="bg-primary section-padding">
      <div className="container-narrow text-center">
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80 text-lg">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to={primaryLink}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
              {primaryLabel}
            </Button>
          </Link>
          {secondaryLabel && secondaryLink && (
            <Link to={secondaryLink}>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;

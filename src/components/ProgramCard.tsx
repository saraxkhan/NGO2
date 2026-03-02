import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const ProgramCard = ({ title, description, image, slug }: ProgramCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
        <Link
          to={`/programs/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;

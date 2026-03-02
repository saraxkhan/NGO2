interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  id?: string;
}

const SectionHeading = ({ title, subtitle, centered = true, id }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 id={id} className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-muted-foreground text-lg leading-relaxed ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 rounded-full bg-accent ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
    </div>
  );
};

export default SectionHeading;

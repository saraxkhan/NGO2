interface StatCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const StatCard = ({ number, label, icon }: StatCardProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-card p-6 text-center shadow-sm border border-border animate-count-up">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon}
      </div>
      <span className="text-3xl font-bold text-primary">{number}</span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

export default StatCard;

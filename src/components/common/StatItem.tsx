interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color?: "primary" | "secondary" | "accent" | "warning" | "error";
}

export function StatItem({
  icon,
  title,
  value,
  description,
  color,
}: StatItemProps) {
  return (
    <div className="stat shadow bg-base-100 p-4 rounded-lg">
      <div className="stat-title text-xs md:text-sm">{title}</div>
      <div className="flex items-center justify-between space-x-2 flex-wrap">
        <div
          className={`stat-value text-${color || "primary"} text-xs md:text-lg`}
        >
          {value}
        </div>
        <div
          className={`stat-figure text-${
            color || "primary"
          } h-5 w-5 sm:h-6 sm:w-6`}
        >
          {icon}
        </div>
      </div>
      <div className="stat-desc text-[10px] sm:text-xs">{description}</div>
    </div>
  );
}

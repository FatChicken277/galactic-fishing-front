import clsx from "clsx";

interface TooltipProps {
  children: React.ReactNode;
  className?: string;
  dataTip: string;
}

export function Tooltip({ children, className, dataTip }: TooltipProps) {
  return (
    <div className={clsx(`tooltip`, className)} data-tip={dataTip}>
      {children}
    </div>
  );
}

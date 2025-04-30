import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(`card bg-base-200 w-full h-full`, className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={clsx(`card-body`, className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h2 className={clsx(`card-title`, className)}>{children}</h2>;
}

export function CardActions({ children, className }: CardProps) {
  return <div className={clsx(`card-actions`, className)}>{children}</div>;
}

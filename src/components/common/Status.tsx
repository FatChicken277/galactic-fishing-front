interface StatusProps {
  color: "success" | "error";
}

export function Status({ color }: StatusProps) {
  return (
    <div className="inline-grid *:[grid-area:1/1]">
      <div className={`status status-${color} animate-ping`}></div>
      <div className={`status status-${color}`}></div>
    </div>
  );
}

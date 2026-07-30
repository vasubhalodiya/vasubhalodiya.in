export function ShimmerLine({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-border/50 ${className}`}>
      <div
        className="shimmer-sweep absolute inset-0 bg-linear-to-r from-transparent via-foreground/15 to-transparent"
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  );
}

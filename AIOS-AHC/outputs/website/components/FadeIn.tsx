/**
 * Fades content in on mount via a pure CSS animation (no JS/scroll
 * dependency). Content is never hidden behind IntersectionObserver, so it
 * can't get stuck invisible for sections far down the page, JS-disabled
 * clients, or crawlers.
 */
export default function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`animate-fade-in-up ${className}`}>{children}</div>;
}

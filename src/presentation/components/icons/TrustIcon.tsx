import type { TrustFeature } from "@/domain/entities/trust-feature";

const iconNames: Record<TrustFeature["icon"], string> = {
  fda: "verified",
  docs: "description",
  distribution: "local_shipping",
  support: "support_agent",
};

export function TrustIcon({
  name,
  className,
}: {
  name: TrustFeature["icon"];
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`}
      aria-hidden="true"
    >
      {iconNames[name]}
    </span>
  );
}

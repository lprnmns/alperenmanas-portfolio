interface TechBadgeProps {
  name: string;
  gradient: string;
}

export default function TechBadge({ name, gradient }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-medium text-white shadow-sm`}
    >
      {name}
    </span>
  );
}

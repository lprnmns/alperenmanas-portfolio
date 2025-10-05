interface TechBadgeProps {
  name: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  Frontend: 'bg-blue-700',
  Backend: 'bg-green-700',
  Database: 'bg-purple-700',
  "AI & Tools": 'bg-yellow-700',
};

export default function TechBadge({ name, category }: TechBadgeProps) {
  const colorClass = category ? categoryColors[category] ?? 'bg-gray-700' : 'bg-gray-700';

  return (
    <span className={`mr-2 mb-2 inline-flex items-center rounded-full ${colorClass} px-3 py-1 text-sm text-gray-300`}>
      {name}
    </span>
  );
}

"use client";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="bg-white/5 hover:bg-white/10 transition border border-white/10 rounded-3xl p-8 group">
      <div className="text-cyan-400 mb-5 group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
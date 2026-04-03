import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-all duration-300 group">
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-primary" size={28} />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;

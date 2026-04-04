interface TestimonialCardProps {
  photo: string;
  name: string;
  role: string;
  text: string;
}

const TestimonialCard = ({ photo, name, role, text }: TestimonialCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-xl hover:border-primary/40 transition-colors">
    <p className="text-muted-foreground text-sm leading-relaxed italic">"{text}"</p>
    <div className="flex items-center gap-3 mt-auto">
      <img
        src={photo}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
        width={48}
        height={48}
        loading="lazy"
      />
      <div>
        <p className="text-foreground font-bold text-sm">{name}</p>
        <p className="text-muted-foreground text-xs">{role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;

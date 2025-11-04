import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
<section className="relative py-28 px-6 bg-background overflow-hidden">
  {/* Background glows */}
  <div className="absolute inset-0">
    {/* soft ambient glow behind cards */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-[120px]" />
    {/* bottom glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-primary/20 blur-[140px] rounded-full opacity-40" />
    {/* top subtle fade */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-primary/10 blur-[100px] opacity-30" />
  </div>

  <div className="max-w-7xl mx-auto relative">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center mb-20 space-y-4"
    >
      <h2 className="text-4xl md:text-6xl font-bold text-gradient">
        What Customers Are Saying
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Real stories. Real transformations. See why South Africa trusts Drip Coat for perfection on wheels.
      </p>
    </motion.div>

    {/* Testimonials Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="relative bg-[hsl(var(--card))]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 
                     shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
                     hover:-translate-y-2 transition-all duration-500 group w-[18rem] h-[26rem]"
        >
          <div className="flex flex-col items-center text-center space-y-4 h-full justify-between">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <p className="text-muted-foreground leading-relaxed italic">“{t.quote}”</p>
            <div className="flex justify-center gap-1 text-primary">
              {Array(t.rating).fill(0).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary" />
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>

          {/* glowing overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


  );
};

export default TestimonialsSection;

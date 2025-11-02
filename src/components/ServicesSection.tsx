import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Shield, Palette, Truck, Play } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices } from "@/store/slices/servicesSlice";

export default function ServicesSection({
  servicesRef,
}: {
  servicesRef?: React.RefObject<HTMLElement>;
}) {
  const services = [
    {
      icon: Sparkles,
      title: "Full Vehicle Wraps",
      description:
        "Transform your ride with precision-crafted wraps that turn heads and protect your investment.",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7564698438407834936",
      image: "../src/assets/full-wrap.jpeg",
    },
    {
      icon: Shield,
      title: "Paint Protection Film",
      description:
        "Premium PPF that shields your vehicle from chips, scratches, and the elements with invisible armor.",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7468638222260460801",
      image:
        "../src/assets/ppf.jpeg",
    },
    {
      icon: Palette,
      title: "Rim Color Wraps",
      description:
        "Customize your wheels with bold, durable rim colors that match your style and make your car stand out.",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7457648228412325129",
      image:
        "../src/assets/Rims.png",
    },
    {
      icon: Truck,
      title: "Fleet Branding",
      description:
        "Elevate your business presence with cohesive, eye-catching designs across your entire fleet.",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7542591121458900225",
      image:
        "../src/assets/fleet-branding.png",
    },
  ];

  return (
    <section
      ref={servicesRef}
      className="py-24 px-6 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-6"
        >
          <motion.h2
            className="relative inline-block text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Our Signature Services</span>
            <motion.span
              className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-primary/60 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            From concept to completion, every detail is executed with unmatched
            precision and artistry.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const videoId = service.videoUrl
    ? service.videoUrl.match(/video\/(\d+)/)?.[1]
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      viewport={{ once: true }}
    >
      <Card className="group relative border-none bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all duration-500 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
        <div className="flex flex-col items-center text-center p-8 space-y-6">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 8, scale: 1.15 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"
          >
            <service.icon className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title + Description */}
          <h3 className="text-xl font-semibold tracking-tight">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Image Display */}
          <div className="relative w-full rounded-xl overflow-hidden mt-4 group">
            <div className="aspect-[9/16] w-full bg-muted rounded-xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Hover Overlay with Play Icon */}
            {videoId && (
              <a
                href={service.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="w-16 h-16 text-white drop-shadow-lg" />
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Phone, Mail, Star, Sparkles, Shield, Palette, Truck } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";
import ppfImage from "@/assets/ppf-detail.jpg";
import fleetImage from "@/assets/fleet-branding.jpg";
import colorImage from "@/assets/color-change.jpg";
import TextType from "./TextType.tsx";
import CountUp from './CountUp';
import TestimonialsSection from "../components/TestimonialsSection.tsx";
import ServicesSection from "../components/ServicesSection";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


const Index = () => {
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();


  const testimonials = [
    {
      name: "Lerato M.",
      role: "Business Owner • Gauteng",
      quote:
        "Drip Coat completely transformed my delivery fleet. The wraps look stunning, durable, and exactly match my brand vision.",
      rating: 5,
      image: "/images/testimonial1.jpg",
    },
    {
      name: "Thabo K.",
      role: "Car Enthusiast • Durban",
      quote:
        "I’ve wrapped three cars here already — every time, they deliver perfection. The attention to detail is insane.",
      rating: 5,
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Michelle R.",
      role: "Creative Director • Cape Town",
      quote:
        "They’re not just good — they’re artists. My clients constantly ask who did our brand vehicle wraps!",
      rating: 5,
      image: "/images/testimonial3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Premium car wrap showcase"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-up opacity-0">
            <span className="text-gradient">Drip Coat</span>
          </h1>
          <p className="text-2xl md:text-4xl font-light text-muted-foreground max-w-4xl mx-auto animate-fade-up animate-delay-200 opacity-0">
            Where <span className="text-shine font-semibold">Precision Meets Passion</span>
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animate-delay-300 opacity-0">
            Premium vehicle wrapping and branding that transforms ordinary rides into extraordinary statements. 
            From full wraps to paint protection, we deliver craftsmanship that lasts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-up animate-delay-400 opacity-0">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/booking")}
              className="text-lg px-10 py-3 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book Appointment
            </Button>
            <Button
              variant="premium"
              size="lg"
              onClick={handleScrollToServices}
              className="text-lg px-10 py-3 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View Services
            </Button>
          </div>

          <TextType 
            className="text-sm md:text-base text-muted-foreground/80 italic pt-4 animate-fade-in animate-delay-600 opacity-0"
            text={[
              "Turn your ride into a masterpiece with Drip Coat",
              "Premium car wraps tailored for your style",
              "Drive bold. Drive different.",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection servicesRef={servicesRef} />

       {/* Quality Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-up opacity-0">
            <span className="text-gradient">Crafted to Perfection</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-up animate-delay-200 opacity-0">
            Every wrap, every curve, every detail is a testament to our commitment to excellence. 
            We don't just apply vinyl—we create automotive art that stands the test of time. 
            Using only premium materials and cutting-edge techniques, Drip Coat delivers finishes 
            that protect your investment while amplifying its presence on the road.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-3 animate-scale-in animate-delay-300 opacity-0">
              <div className="text-5xl font-bold text-primary">
                <CountUp
                  from={0}
                  to={5}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                /><span>+</span>
              </div>

              <div className="text-lg text-muted-foreground">Years Experience</div>
            </div>
            <div className="space-y-3 animate-scale-in animate-delay-400 opacity-0">
              <div className="text-5xl font-bold text-accent">
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                /><span>+</span>
              </div>
              <div className="text-lg text-muted-foreground">Vehicles Transformed</div>
            </div>
            <div className="space-y-3 animate-scale-in animate-delay-500 opacity-0">
              <div className="text-5xl font-bold text-primary">
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />%
              </div>
              <div className="text-lg text-muted-foreground">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-background relative overflow-hidden">
      {/* Background glow */}
              <TestimonialsSection testimonials={testimonials} />

    </section>


      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto animate-fade-up opacity-0">
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-primary/20 elegant-shadow transition-all duration-500 hover:scale-[1.01]">
            <div className="p-12 text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Make a Statement?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's discuss your vision and create something extraordinary. 
                Your dream wrap is just a conversation away.
              </p>
              
              {/* <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Button variant="hero" size="lg" className="text-lg px-8 py-3 h-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <Phone className="w-5 h-5" />
                  Call Us
                </Button>
                <Button variant="premium" size="lg" className="text-lg px-8 py-3 h-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
                <Button variant="premium" size="lg" className="text-lg px-8 py-3 h-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <Mail className="w-5 h-5" />
                  Email Us
                </Button>
                <Button variant="premium" size="lg" className="text-lg px-8 py-3 h-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <Music2 className="w-5 h-5" />
                  TikTok
                </Button>
              </div> */}
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-12 px-6 border-t border-primary/10">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <p className="text-2xl font-bold text-gradient">Drip Coat</p>
            <p className="text-muted-foreground">
              Premium Vehicle Wrapping & Branding
            </p>

            <div className="flex justify-center gap-6 pt-4">
              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>

              {/* Email */}
              <a
                href="mailto:info@drip Coat.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* WhatsApp SVG */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2C6.477 2 2 6.243 2 11.5c0 1.92.553 3.693 1.515 5.203L2 22l5.505-1.44A9.77 9.77 0 0012 21c5.523 0 10-4.243 10-9.5S17.523 2 12 2zm0 17.5a8.1 8.1 0 01-4.136-1.13l-.296-.175-3.266.853.871-3.071-.195-.312A7.015 7.015 0 014.5 11.5C4.5 7.358 7.962 4 12 4s7.5 3.358 7.5 7.5S16.038 19.5 12 19.5z" />
                </svg>
              </a>

              {/* TikTok SVG */}
              <a
                href="https://tiktok.com/@drip Coat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12.5 2h3.4a4.6 4.6 0 004.6 4.6V10a8.6 8.6 0 01-4.6-1.4v6.2A7.2 7.2 0 018.7 22 7.2 7.2 0 011.5 14.8a7.2 7.2 0 017.2-7.2c.3 0 .5 0 .8.1v3.4a4 4 0 00-.8-.1 3.8 3.8 0 00-3.8 3.8 3.8 3.8 0 007.6 0V2z" />
                </svg>
              </a>
            </div>

            <p className="text-sm text-muted-foreground/60 pt-4">
              © 2025 Drip Coat. All rights reserved.
            </p>
          </div>
        </footer>
    </div>
  );
};

export default Index;

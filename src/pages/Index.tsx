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
          alt="Premium car wrap."
          className="w-full h-full object-cover brightness-[0.65] contrast-[1.05]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,3,19,0.8) 0%, rgba(7, 5, 17, 0.75) 55%, rgba(10, 6, 17, 0.9) 75%, rgba(13, 12, 29, 0.97) 90%, rgba(8, 9, 17, 1) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-up opacity-0">
          <span className="bg-gradient-to-r from-[#5A4BFF] via-[#8B5CF6] to-[#00B2FF] bg-clip-text text-transparent">
            Drip Coat
          </span>
        </h1>

        <p className="text-base md:text-3xl font-thin text-gray-400 max-w-4xl mx-auto animate-fade-up animate-delay-200 opacity-0">
          <span className="text-gray-400">Where</span>
          <span className="text-white font-medium"> Precision Meets Passion</span>
        </p>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto animate-fade-up animate-delay-300 opacity-0">
          Premium vehicle wrapping and branding that transforms ordinary rides into extraordinary statements.
          From full wraps to paint protection, we deliver craftsmanship that lasts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-up animate-delay-400 opacity-0">
          {/* Book Appointment Button */}
          <button
            onClick={() => navigate('/booking')}
            className="bg-gradient-to-r from-[#4A41FF] via-[#7C4DFF] to-[#00A9FF]
            text-white text-lg px-10 py-3 rounded-xl font-semibold
            shadow-[0_0_15px_rgba(100,80,255,0.4)]
            border border-[#4A41FF]/40 transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_25px_rgba(100,80,255,0.6)]"
          >
            Book Appointment
          </button>

          {/* View Services Button */}
          <button
            onClick={handleScrollToServices}
            className="bg-black/60 text-white text-lg px-10 py-3 rounded-xl font-semibold
            border border-[#5A4BFF]/50 backdrop-blur-sm
            hover:bg-black/80 hover:border-[#7C4DFF]/70 hover:scale-105 transition-all duration-300"
          >
            View Services
          </button>
        </div>

        <p className="text-xl md:text-base text-gray-400 italic pt-4 animate-fade-in animate-delay-600 opacity-0">
          <TextType className="text-sm md:text-base text-muted-foreground/80 italic pt-4 animate-fade-in animate-delay-600 opacity-0" text={[ "Turn your ride into a masterpiece with Drip Coat.", "Premium car wraps tailored for your style.", "Drive bold. Drive different.", ]} typingSpeed={75} pauseDuration={1500} showCursor={true} cursorCharacter="|" />
        </p>
      </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#5A4BFF]/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#5A4BFF]/50 rounded-full" />
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
              <div className="text-5xl font-bold text-gradient">
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
              <div className="text-5xl font-bold text-gradient">
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
              <div className="text-5xl font-bold text-gradient">
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
          <section className="py-24 px-6 relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-3xl opacity-60" />

            <div className="max-w-4xl mx-auto relative animate-fade-up opacity-0">
              <div
                className="bg-[rgba(11,13,24,0.7)] border border-blue-900/30 
                backdrop-blur-xl rounded-2xl p-12 text-center shadow-[0_0_35px_-10px_rgba(0,0,255,0.25)] 
                transition-all duration-500 hover:shadow-[0_0_55px_-10px_rgba(0,0,255,0.4)]"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                  Ready to Make a Statement?
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mt-4">
                  Let’s discuss your vision and create something extraordinary.
                  Your dream wrap is just a conversation away.
                </p>
              </div>
  </div>
</section>

{/* Footer */}
<footer className="py-14 px-6 border-t border-blue-900/20 bg-[rgba(9,9,16,0.9)] backdrop-blur-sm">
  <div className="max-w-7xl mx-auto text-center space-y-4">
    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Drip Coat
    </p>
    <p className="text-gray-400">
      Premium Vehicle Wrapping & Branding
    </p>

    <div className="flex justify-center gap-8 pt-4">
      {/* Phone */}
      <a
        href="tel:+1234567890"
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Email */}
      <a
        href="mailto:info@dripcoat.com"
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        <Mail className="w-5 h-5" />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-green-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.477 2 2 6.243 2 11.5c0 1.92.553 3.693 1.515 5.203L2 22l5.505-1.44A9.77 9.77 0 0012 21c5.523 0 10-4.243 10-9.5S17.523 2 12 2zm0 17.5a8.1 8.1 0 01-4.136-1.13l-.296-.175-3.266.853.871-3.071-.195-.312A7.015 7.015 0 014.5 11.5C4.5 7.358 7.962 4 12 4s7.5 3.358 7.5 7.5S16.038 19.5 12 19.5z" />
        </svg>
      </a>

      {/* TikTok */}
      <a
        href="https://tiktok.com/@dripcoat"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.5 2h3.4a4.6 4.6 0 004.6 4.6V10a8.6 8.6 0 01-4.6-1.4v6.2A7.2 7.2 0 018.7 22 7.2 7.2 0 011.5 14.8a7.2 7.2 0 017.2-7.2c.3 0 .5 0 .8.1v3.4a4 4 0 00-.8-.1 3.8 3.8 0 00-3.8 3.8 3.8 3.8 0 007.6 0V2z" />
        </svg>
      </a>
    </div>

    <p className="text-sm text-gray-500 pt-4">
      © 2025 Drip Coat. All rights reserved.
    </p>
  </div>
</footer>

    </div>
  );
};

export default Index;

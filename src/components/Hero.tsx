import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-sports.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Athletes in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-body mb-6">
              Live Sports Coverage
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-foreground">Unleash Your</span>
            <br />
            <span className="text-gradient">Inner Champion</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the thrill of every game, every play, every moment. Your ultimate destination for live sports, news, and exclusive coverage.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5" />
              Watch Live
            </Button>
            <Button variant="heroOutline" size="xl">
              Explore Sports
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground font-body">Sports Covered</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground font-body">Live Coverage</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">10M+</p>
              <p className="text-sm text-muted-foreground font-body">Active Fans</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
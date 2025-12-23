import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Bell, Trophy } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Live Streaming",
    description: "Watch every game in HD quality",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Never miss a moment with instant notifications",
  },
  {
    icon: Trophy,
    title: "Exclusive Content",
    description: "Access behind-the-scenes and interviews",
  },
];

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">
            Ready to <span className="text-gradient">Experience</span>
            <br />
            Sports Like Never Before?
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            Join millions of fans who trust us for their daily sports coverage. Start your journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl">
              Get Started Free
            </Button>
            <Button variant="heroOutline" size="xl">
              Learn More
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-8 rounded-2xl card-gradient border border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { motion } from "framer-motion";
import { Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerificationBannerProps {
  isVerified: boolean;
}

export const VerificationBanner = ({ isVerified }: VerificationBannerProps) => {
  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-6 flex items-center gap-4"
      >
        <div className="p-3 bg-primary/20 rounded-full">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            You're Verified!
          </h3>
          <p className="text-muted-foreground">
            You have access to all premium tournaments and features.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 border border-primary/40 rounded-xl p-6"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="p-4 bg-primary/20 rounded-xl">
          <Shield className="w-10 h-10 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Get Verified to Unlock Paid Tournaments
          </h3>
          <p className="text-muted-foreground max-w-2xl">
            Verified athletes gain access to exclusive tournaments with cash prizes, 
            priority registration, and a verified badge on their profile. Stand out from the crowd!
          </p>
        </div>

        <Button variant="hero" size="lg" className="shrink-0">
          Get Verified
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
    </motion.div>
  );
};

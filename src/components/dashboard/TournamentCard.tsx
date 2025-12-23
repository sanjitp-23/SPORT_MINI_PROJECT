import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TournamentCardProps {
  id: string;
  name: string;
  sport: string;
  location: string;
  date: string;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  isVerifiedOnly: boolean;
  isUserVerified: boolean;
  onRegister: (id: string) => void;
  delay?: number;
}

export const TournamentCard = ({
  id,
  name,
  sport,
  location,
  date,
  entryFee,
  prizePool,
  maxParticipants,
  currentParticipants,
  isVerifiedOnly,
  isUserVerified,
  onRegister,
  delay = 0,
}: TournamentCardProps) => {
  const spotsLeft = maxParticipants - currentParticipants;
  const isLocked = isVerifiedOnly && !isUserVerified;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sportColors: Record<string, string> = {
    basketball: "bg-orange-500/20 text-orange-400",
    soccer: "bg-green-500/20 text-green-400",
    tennis: "bg-yellow-500/20 text-yellow-400",
    football: "bg-red-500/20 text-red-400",
    other: "bg-purple-500/20 text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all",
        isLocked && "opacity-75"
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <Badge className={cn("font-medium", sportColors[sport] || sportColors.other)}>
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </Badge>
          {isVerifiedOnly && (
            <Badge variant="outline" className="border-primary/50 text-primary">
              <Lock className="w-3 h-3 mr-1" />
              Verified Only
            </Badge>
          )}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {name}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(date)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 grid grid-cols-3 gap-4 border-b border-border">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Entry Fee</p>
          <p className="font-display font-bold text-foreground">
            {entryFee === 0 ? "FREE" : `$${entryFee}`}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Prize Pool</p>
          <p className="font-display font-bold text-primary flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            ${prizePool}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Spots Left</p>
          <p className="font-display font-bold text-foreground flex items-center gap-1">
            <Users className="w-4 h-4" />
            {spotsLeft}/{maxParticipants}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="p-5">
        <Button
          variant="hero"
          className="w-full"
          disabled={isLocked || spotsLeft === 0}
          onClick={() => onRegister(id)}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Get Verified to Register
            </>
          ) : spotsLeft === 0 ? (
            "Tournament Full"
          ) : (
            "Register Now"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

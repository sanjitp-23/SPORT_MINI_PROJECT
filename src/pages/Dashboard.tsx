import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Star, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TournamentCard } from "@/components/dashboard/TournamentCard";
import { VerificationBanner } from "@/components/dashboard/VerificationBanner";
import { toast } from "sonner";

interface Tournament {
  id: string;
  name: string;
  sport: string;
  location: string;
  date: string;
  entry_fee: number;
  prize_pool: number;
  max_participants: number;
  current_participants: number;
  is_verified_only: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loadingTournaments, setLoadingTournaments] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("date", { ascending: true })
        .limit(6);

      if (error) {
        console.error("Error fetching tournaments:", error);
        toast.error("Failed to load tournaments");
      } else {
        setTournaments(data || []);
      }
      setLoadingTournaments(false);
    };

    if (user) {
      fetchTournaments();
    }
  }, [user]);

  const handleRegister = async (tournamentId: string) => {
    if (!user) return;

    const { error } = await supabase.from("tournament_registrations").insert({
      tournament_id: tournamentId,
      user_id: user.id,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("You're already registered for this tournament");
      } else {
        toast.error("Failed to register for tournament");
      }
    } else {
      toast.success("Successfully registered for tournament!");
      // Update local state
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === tournamentId
            ? { ...t, current_participants: t.current_participants + 1 }
            : t
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-display text-2xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="ml-64">
        <DashboardHeader />

        <main className="p-6">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.name || "Champion"}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your athletic journey.
            </p>
          </motion.div>

          {/* Stats */}
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              My Career
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Matches Played"
                value={profile?.matches_played || 0}
                icon={Gamepad2}
                subtitle="Total competitive matches"
                delay={0.1}
              />
              <StatsCard
                title="Reputation Score"
                value={profile?.reputation_score || 0}
                icon={Star}
                subtitle="Based on performance & sportsmanship"
                delay={0.2}
              />
              <StatsCard
                title="Tournaments Won"
                value={0}
                icon={Trophy}
                subtitle="Championship victories"
                delay={0.3}
              />
            </div>
          </section>

          {/* Verification Banner */}
          <section className="mb-8">
            <VerificationBanner isVerified={profile?.is_verified || false} />
          </section>

          {/* Upcoming Tournaments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Upcoming Tournaments
              </h2>
              <button className="text-primary hover:underline text-sm font-medium">
                View All
              </button>
            </div>

            {loadingTournaments ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl h-72 animate-pulse"
                  />
                ))}
              </div>
            ) : tournaments.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Trophy className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  No Active Tournaments
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for upcoming competitions!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament, index) => (
                  <TournamentCard
                    key={tournament.id}
                    id={tournament.id}
                    name={tournament.name}
                    sport={tournament.sport}
                    location={tournament.location}
                    date={tournament.date}
                    entryFee={Number(tournament.entry_fee)}
                    prizePool={Number(tournament.prize_pool)}
                    maxParticipants={tournament.max_participants}
                    currentParticipants={tournament.current_participants}
                    isVerifiedOnly={tournament.is_verified_only}
                    isUserVerified={profile?.is_verified || false}
                    onRegister={handleRegister}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

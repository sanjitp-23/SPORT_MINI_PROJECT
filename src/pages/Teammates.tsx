import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Users, MapPin, Send, User, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  name: string;
  is_verified: boolean;
}

interface TeamRequest {
  id: string;
  user_id: string;
  sport: string;
  position_needed: string;
  location: string;
  description: string | null;
  created_at: string;
  profiles?: {
    name: string;
    is_verified: boolean;
  };
}

const POSITIONS: Record<string, string[]> = {
  basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  football: ["Quarterback", "Running Back", "Wide Receiver", "Tight End", "Linebacker", "Cornerback"],
  soccer: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Striker"],
  tennis: ["Singles Partner", "Doubles Partner"],
};

const SPORTS = ["basketball", "football", "soccer", "tennis"];

export default function Teammates() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [requests, setRequests] = useState<TeamRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [sport, setSport] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      return;
    }
    fetchRequests();
  }, [user, navigate]);

  const fetchRequests = async () => {
    // Fetch team requests
    const { data: requestsData, error: requestsError } = await supabase
      .from("team_requests")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (requestsError) {
      console.error("Error fetching requests:", requestsError);
      setLoading(false);
      return;
    }

    // Fetch profiles for each unique user_id
    const userIds = [...new Set(requestsData?.map(r => r.user_id) || [])];
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("user_id, name, is_verified")
      .in("user_id", userIds);

    const profilesMap = new Map<string, Profile>();
    profilesData?.forEach(p => profilesMap.set(p.user_id, { name: p.name, is_verified: p.is_verified }));

    const requestsWithProfiles = requestsData?.map(request => ({
      ...request,
      profiles: profilesMap.get(request.user_id) || undefined
    })) || [];

    setRequests(requestsWithProfiles);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !sport || !position || !location) return;

    setSubmitting(true);
    const { error } = await supabase.from("team_requests").insert({
      user_id: user.id,
      sport: sport as any,
      position_needed: position,
      location,
      description: description || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request Posted!",
        description: "Your teammate request is now live",
      });
      setSport("");
      setPosition("");
      setLocation("");
      setDescription("");
      fetchRequests();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("team_requests")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Your request has been removed",
      });
      fetchRequests();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="ml-64">
        <DashboardHeader />

        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Find <span className="text-gradient">Teammates</span>
              </h1>
              <p className="text-muted-foreground">
                Connect with athletes looking to team up
              </p>
            </div>

            {/* Post Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 mb-8"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Post a Request
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sport
                    </label>
                    <Select value={sport} onValueChange={(value) => { setSport(value); setPosition(""); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPORTS.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Looking for
                    </label>
                    <Select value={position} onValueChange={setPosition} disabled={!sport}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {sport && POSITIONS[sport]?.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Downtown NYC"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Details (optional)
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us more about what you're looking for..."
                    className="bg-secondary border-border resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!sport || !position || !location || submitting}
                  className="hero-gradient text-primary-foreground font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? "Posting..." : "Post Request"}
                </Button>
              </form>
            </motion.div>

            {/* Feed */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Recent Requests
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : requests.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <Users className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    No Requests Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Be the first to post a teammate request!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">
                                {(request.profiles as any)?.name || "Athlete"}
                              </span>
                              {(request.profiles as any)?.is_verified && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                  Verified
                                </span>
                              )}
                              <span className="text-muted-foreground text-sm">
                                · {format(new Date(request.created_at), "MMM d")}
                              </span>
                            </div>
                            <p className="text-foreground mb-2">
                              Looking for a{" "}
                              <span className="text-primary font-semibold">
                                {request.position_needed}
                              </span>{" "}
                              for{" "}
                              <span className="capitalize font-medium">
                                {request.sport}
                              </span>
                            </p>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{request.location}</span>
                            </div>
                            {request.description && (
                              <p className="text-muted-foreground text-sm mt-2">
                                {request.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {request.user_id === user?.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(request.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
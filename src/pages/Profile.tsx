import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { User, Shield, Calendar, MapPin, Users, Trash2, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  booking_date: string;
  time_slot: string;
  status: string;
  created_at: string;
  turfs: {
    name: string;
    location: string;
    hourly_rate: number;
  };
}

interface TeamRequest {
  id: string;
  sport: string;
  position_needed: string;
  location: string;
  description: string | null;
  created_at: string;
  is_active: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [posts, setPosts] = useState<TeamRequest[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      return;
    }
    fetchBookings();
    fetchPosts();
  }, [user, navigate]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        turfs (
          name,
          location,
          hourly_rate
        )
      `)
      .eq("user_id", user?.id)
      .order("booking_date", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data || []);
    }
    setLoadingBookings(false);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("team_requests")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoadingPosts(false);
  };

  const cancelBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Booking Cancelled" });
      fetchBookings();
    }
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("team_requests").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Post Deleted" });
      fetchPosts();
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
            {/* Profile Header */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      {profile?.name || "Athlete"}
                    </h1>
                    {profile?.is_verified && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                        <Shield className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground capitalize">
                    {profile?.primary_sport} · {profile?.matches_played || 0} Matches · {profile?.reputation_score || 0} Rep Score
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  My Bookings
                </TabsTrigger>
                <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  My Posts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings">
                {loadingBookings ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-card rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <Calendar className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      No Bookings Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Book a turf to see your reservations here
                    </p>
                    <Button
                      onClick={() => navigate("/turfs")}
                      className="hero-gradient text-primary-foreground"
                    >
                      Browse Turfs
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card border border-border rounded-xl p-5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {booking.turfs?.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{format(new Date(booking.booking_date), "PPP")}</span>
                              <span>{booking.time_slot}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.turfs?.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-primary font-semibold">
                              <DollarSign className="w-4 h-4" />
                              {booking.turfs?.hourly_rate}
                            </div>
                            <span className={`text-xs font-medium capitalize ${
                              booking.status === "confirmed" ? "text-green-500" : "text-muted-foreground"
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => cancelBooking(booking.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="posts">
                {loadingPosts ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-card rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <Users className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      No Posts Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Post a teammate request to find players
                    </p>
                    <Button
                      onClick={() => navigate("/teammates")}
                      className="hero-gradient text-primary-foreground"
                    >
                      Find Teammates
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card border border-border rounded-xl p-5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              Looking for <span className="text-primary">{post.position_needed}</span>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="capitalize">{post.sport}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {post.location}
                              </span>
                              <span>{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                            </div>
                            {post.description && (
                              <p className="text-muted-foreground text-sm mt-1">{post.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            post.is_active ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                          }`}>
                            {post.is_active ? "Active" : "Closed"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deletePost(post.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
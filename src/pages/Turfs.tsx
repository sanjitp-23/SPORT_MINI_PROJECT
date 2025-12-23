import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { MapPin, DollarSign, Clock, X, CalendarIcon, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Turf {
  id: string;
  name: string;
  location: string;
  hourly_rate: number;
  image_url: string | null;
  sport: string;
  description: string | null;
}

const TIME_SLOTS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
];

const SPORT_IMAGES: Record<string, string> = {
  basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
  football: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
  tennis: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
  soccer: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
};

export default function Turfs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      return;
    }
    fetchTurfs();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedTurf && selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedTurf, selectedDate]);

  const fetchTurfs = async () => {
    const { data, error } = await supabase
      .from("turfs")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching turfs:", error);
    } else {
      setTurfs(data || []);
    }
    setLoading(false);
  };

  const fetchBookedSlots = async () => {
    if (!selectedTurf || !selectedDate) return;
    
    const { data } = await supabase
      .from("bookings")
      .select("time_slot")
      .eq("turf_id", selectedTurf.id)
      .eq("booking_date", format(selectedDate, "yyyy-MM-dd"));

    setBookedSlots(data?.map(b => b.time_slot) || []);
  };

  const handleBooking = async () => {
    if (!selectedTurf || !selectedDate || !selectedSlot || !user) return;

    setIsBooking(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      turf_id: selectedTurf.id,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedSlot,
    });

    if (error) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Booking Confirmed!",
        description: `You've booked ${selectedTurf.name} for ${format(selectedDate, "PPP")} at ${selectedSlot}`,
      });
      setSelectedTurf(null);
      setSelectedDate(undefined);
      setSelectedSlot(null);
    }
    setIsBooking(false);
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
                Book a <span className="text-gradient">Turf</span>
              </h1>
              <p className="text-muted-foreground">
                Find and book premium sports venues near you
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-card rounded-xl animate-pulse" />
                ))}
              </div>
            ) : turfs.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  No Turfs Available
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for new venues!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {turfs.map((turf, index) => (
                  <motion.div
                    key={turf.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedTurf(turf)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={turf.image_url || SPORT_IMAGES[turf.sport] || SPORT_IMAGES.football}
                        alt={turf.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full capitalize">
                          {turf.sport}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {turf.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {turf.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{turf.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <DollarSign className="w-4 h-4" />
                          <span>{turf.hourly_rate}/hr</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedTurf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTurf(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img
                  src={selectedTurf.image_url || SPORT_IMAGES[selectedTurf.sport] || SPORT_IMAGES.football}
                  alt={selectedTurf.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button
                  onClick={() => setSelectedTurf(null)}
                  className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {selectedTurf.name}
                </h2>
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedTurf.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>{selectedTurf.hourly_rate}/hr</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={cn(
                                "px-2 py-2 text-xs rounded-lg font-medium transition-all",
                                isBooked
                                  ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                  : isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                              )}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  <Button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedSlot || isBooking}
                    className="w-full hero-gradient text-primary-foreground font-semibold py-6"
                  >
                    {isBooking ? (
                      "Booking..."
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
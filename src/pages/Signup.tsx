import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import athleteImage from "@/assets/athlete-signup.jpg";

const sports = [
  { value: "basketball", label: "Basketball" },
  { value: "soccer", label: "Soccer" },
  { value: "tennis", label: "Tennis" },
  { value: "football", label: "Football" },
  { value: "other", label: "Other" },
];

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    primarySport: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message || "Failed to sign in");
        } else {
          toast.success("Welcome back, Champion!");
          navigate("/dashboard");
        }
      } else {
        if (!formData.name || !formData.primarySport) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.primarySport
        );
        
        if (error) {
          toast.error(error.message || "Failed to create account");
        } else {
          toast.success("Welcome to the Champion's Arena!");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Athlete Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={athleteImage}
          alt="Athlete in action"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <motion.div
          className="relative z-10 flex flex-col justify-end p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl font-bold text-gradient mb-4">
            UNLEASH YOUR
            <br />
            INNER CHAMPION
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Join thousands of athletes competing in tournaments, building their reputation, and connecting with the sports community.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back" : "Create Your Athlete Profile"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Join the arena and start competing today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-card border-border focus:border-primary"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-card border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-card border-border focus:border-primary pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="sport" className="text-foreground">
                  Primary Sport
                </Label>
                <Select
                  value={formData.primarySport}
                  onValueChange={(value) =>
                    setFormData({ ...formData, primarySport: value })
                  }
                >
                  <SelectTrigger className="bg-card border-border focus:border-primary">
                    <SelectValue placeholder="Select your sport" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {sports.map((sport) => (
                      <SelectItem
                        key={sport.value}
                        value={sport.value}
                        className="focus:bg-primary/20"
                      >
                        {sport.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Create Athlete Profile"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

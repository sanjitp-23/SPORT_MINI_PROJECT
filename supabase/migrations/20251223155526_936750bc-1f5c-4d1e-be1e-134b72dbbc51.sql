-- Create turfs table
CREATE TABLE public.turfs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  hourly_rate NUMERIC NOT NULL DEFAULT 50,
  image_url TEXT,
  sport primary_sport NOT NULL DEFAULT 'football',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on turfs
ALTER TABLE public.turfs ENABLE ROW LEVEL SECURITY;

-- Everyone can view turfs
CREATE POLICY "Anyone can view turfs"
ON public.turfs
FOR SELECT
USING (true);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  turf_id UUID NOT NULL REFERENCES public.turfs(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create their own bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can cancel their own bookings
CREATE POLICY "Users can delete their own bookings"
ON public.bookings
FOR DELETE
USING (auth.uid() = user_id);

-- Create team_requests table
CREATE TABLE public.team_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  sport primary_sport NOT NULL,
  position_needed TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on team_requests
ALTER TABLE public.team_requests ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view active team requests
CREATE POLICY "Users can view active team requests"
ON public.team_requests
FOR SELECT
USING (is_active = true);

-- Users can create their own team requests
CREATE POLICY "Users can create their own team requests"
ON public.team_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own team requests
CREATE POLICY "Users can update their own team requests"
ON public.team_requests
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own team requests
CREATE POLICY "Users can delete their own team requests"
ON public.team_requests
FOR DELETE
USING (auth.uid() = user_id);

-- Insert sample turfs
INSERT INTO public.turfs (name, location, hourly_rate, sport, description, image_url) VALUES
('Downtown Arena', 'Central Business District', 75, 'basketball', 'Premium indoor basketball court with professional-grade flooring', null),
('City Futsal Center', 'Sports Complex, Sector 5', 60, 'football', 'FIFA-certified futsal court with floodlights for night games', null),
('Elite Tennis Club', 'Greenwood Park', 100, 'tennis', 'Clay court maintained to international standards', null),
('Metro Sports Hub', 'East Side Stadium', 50, 'football', 'Large outdoor football field with synthetic turf', null);
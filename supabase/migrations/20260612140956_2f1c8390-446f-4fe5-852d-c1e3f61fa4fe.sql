
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  num_guests integer NOT NULL CHECK (num_guests >= 1 AND num_guests <= 10),
  arrival_date date NOT NULL,
  departure_date date NOT NULL,
  total_nights integer NOT NULL CHECK (total_nights >= 2),
  special_requests text,
  booking_status text NOT NULL DEFAULT 'pending' CHECK (booking_status IN ('pending','confirmed','cancelled')),
  deposit_status text NOT NULL DEFAULT 'unpaid' CHECK (deposit_status IN ('unpaid','paid','refunded')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT departure_after_arrival CHECK (departure_date > arrival_date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read bookings" ON public.bookings FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete bookings" ON public.bookings FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX bookings_dates_idx ON public.bookings (arrival_date, departure_date)
  WHERE booking_status <> 'cancelled';

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.max_overlapping_guests(_arrival date, _departure date)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH nights AS (
    SELECT generate_series(_arrival, _departure - INTERVAL '1 day', INTERVAL '1 day')::date AS night
  ),
  night_loads AS (
    SELECT n.night, COALESCE(SUM(b.num_guests), 0) AS guests
    FROM nights n
    LEFT JOIN public.bookings b
      ON b.booking_status <> 'cancelled'
     AND b.arrival_date <= n.night
     AND b.departure_date > n.night
    GROUP BY n.night
  )
  SELECT COALESCE(MAX(guests), 0)::int FROM night_loads;
$$;

GRANT EXECUTE ON FUNCTION public.max_overlapping_guests(date, date) TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

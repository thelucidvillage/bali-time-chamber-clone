
REVOKE EXECUTE ON FUNCTION public.max_overlapping_guests(date, date) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
-- authenticated keeps EXECUTE on has_role (used in RLS policies)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

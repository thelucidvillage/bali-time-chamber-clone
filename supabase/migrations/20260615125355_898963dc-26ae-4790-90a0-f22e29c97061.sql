
-- Lock down user_roles: prevent any privilege escalation by clients.
-- Revoke direct grants from anon/authenticated; only service_role and SECURITY DEFINER functions can write.
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated, PUBLIC;

-- Explicit restrictive policies to make intent clear and defense-in-depth.
DROP POLICY IF EXISTS "No client inserts on user_roles" ON public.user_roles;
CREATE POLICY "No client inserts on user_roles" ON public.user_roles
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "No client updates on user_roles" ON public.user_roles;
CREATE POLICY "No client updates on user_roles" ON public.user_roles
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No client deletes on user_roles" ON public.user_roles;
CREATE POLICY "No client deletes on user_roles" ON public.user_roles
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

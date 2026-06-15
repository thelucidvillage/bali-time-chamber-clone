INSERT INTO public.user_roles (user_id, role)
VALUES ('32b0e50c-e276-4d41-adec-4c61919f8ee0', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
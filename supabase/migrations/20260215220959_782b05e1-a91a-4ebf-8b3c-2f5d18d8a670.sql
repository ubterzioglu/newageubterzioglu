-- Roles (separate table) + helper
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Minimal self-read for authenticated users (lets user see their own roles, useful for debugging)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Users can view their own roles'
  ) THEN
    CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Cards
CREATE TABLE IF NOT EXISTS public.content_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona text NOT NULL, -- e.g. recruiter, colleague, qa, curious
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  image_path text, -- storage path or public URL
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_card_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id uuid NOT NULL REFERENCES public.content_cards(id) ON DELETE CASCADE,
  label text NOT NULL,
  href text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.content_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_card_actions ENABLE ROW LEVEL SECURITY;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_content_cards_updated_at') THEN
    CREATE TRIGGER trg_content_cards_updated_at
    BEFORE UPDATE ON public.content_cards
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_cards_persona_sort ON public.content_cards(persona, sort_order);
CREATE INDEX IF NOT EXISTS idx_content_card_actions_card_sort ON public.content_card_actions(card_id, sort_order);

-- RLS policies: public read, admin write
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_cards' AND policyname='Public can read cards'
  ) THEN
    CREATE POLICY "Public can read cards"
    ON public.content_cards
    FOR SELECT
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_cards' AND policyname='Admins can manage cards'
  ) THEN
    CREATE POLICY "Admins can manage cards"
    ON public.content_cards
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_card_actions' AND policyname='Public can read card actions'
  ) THEN
    CREATE POLICY "Public can read card actions"
    ON public.content_card_actions
    FOR SELECT
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_card_actions' AND policyname='Admins can manage card actions'
  ) THEN
    CREATE POLICY "Admins can manage card actions"
    ON public.content_card_actions
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Storage bucket + policies (store ONLY URLs/paths in DB)
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-images', 'card-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  -- Public can view card images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public can read card images'
  ) THEN
    CREATE POLICY "Public can read card images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'card-images');
  END IF;

  -- Admin upload/update/delete
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can upload card images'
  ) THEN
    CREATE POLICY "Admins can upload card images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'card-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can update card images'
  ) THEN
    CREATE POLICY "Admins can update card images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'card-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can delete card images'
  ) THEN
    CREATE POLICY "Admins can delete card images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'card-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
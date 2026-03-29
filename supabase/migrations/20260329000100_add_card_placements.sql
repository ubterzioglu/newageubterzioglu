ALTER TABLE public.content_cards
ADD COLUMN IF NOT EXISTS placement_key text NOT NULL DEFAULT 'recruiter:panel';

ALTER TABLE public.content_cards
ADD COLUMN IF NOT EXISTS source_template_key text;

CREATE INDEX IF NOT EXISTS idx_content_cards_persona_placement_sort
ON public.content_cards(persona, placement_key, sort_order);

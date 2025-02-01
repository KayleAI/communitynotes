CREATE UNIQUE INDEX note_votes_note_id_external_id_unique ON public.note_votes USING btree (note_id, external_id) WHERE (external_id IS NOT NULL);



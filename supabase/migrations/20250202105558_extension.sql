create table "public"."extension" (
    "request_id" uuid not null default gen_random_uuid(),
    "note_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "url" text not null,
    "phrase" text
);


alter table "public"."extension" enable row level security;

CREATE UNIQUE INDEX extension_note_id_key ON public.extension USING btree (note_id);

CREATE UNIQUE INDEX extension_pkey ON public.extension USING btree (request_id);

alter table "public"."extension" add constraint "extension_pkey" PRIMARY KEY using index "extension_pkey";

alter table "public"."extension" add constraint "extension_note_id_fkey" FOREIGN KEY (note_id) REFERENCES notes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."extension" validate constraint "extension_note_id_fkey";

alter table "public"."extension" add constraint "extension_note_id_key" UNIQUE using index "extension_note_id_key";

grant delete on table "public"."extension" to "anon";

grant insert on table "public"."extension" to "anon";

grant references on table "public"."extension" to "anon";

grant select on table "public"."extension" to "anon";

grant trigger on table "public"."extension" to "anon";

grant truncate on table "public"."extension" to "anon";

grant update on table "public"."extension" to "anon";

grant delete on table "public"."extension" to "authenticated";

grant insert on table "public"."extension" to "authenticated";

grant references on table "public"."extension" to "authenticated";

grant select on table "public"."extension" to "authenticated";

grant trigger on table "public"."extension" to "authenticated";

grant truncate on table "public"."extension" to "authenticated";

grant update on table "public"."extension" to "authenticated";

grant delete on table "public"."extension" to "service_role";

grant insert on table "public"."extension" to "service_role";

grant references on table "public"."extension" to "service_role";

grant select on table "public"."extension" to "service_role";

grant trigger on table "public"."extension" to "service_role";

grant truncate on table "public"."extension" to "service_role";

grant update on table "public"."extension" to "service_role";

create policy "no_access_extension"
on "public"."extension"
as permissive
for all
to public
using (false);




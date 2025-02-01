create type "public"."Note Rating" as enum ('helpful', 'not_helpful', 'not_enough_votes');

create type "public"."Vote Type" as enum ('helpful', 'not_helpful');

create table "public"."note_authors" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "external_id" text,
    "name" text
);


alter table "public"."note_authors" enable row level security;

create table "public"."note_requests" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" text not null,
    "content_id" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "context" text
);


alter table "public"."note_requests" enable row level security;

create table "public"."note_votes" (
    "vote_id" uuid not null default gen_random_uuid(),
    "note_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "vote" "Vote Type" not null,
    "external_id" text
);


alter table "public"."note_votes" enable row level security;

create table "public"."notes" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" text not null,
    "content_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "context" text,
    "rating" "Note Rating" not null default 'not_enough_votes'::"Note Rating",
    "author_id" uuid
);


alter table "public"."notes" enable row level security;

CREATE UNIQUE INDEX note_authors_pkey ON public.note_authors USING btree (id);

CREATE UNIQUE INDEX note_requests_pkey ON public.note_requests USING btree (id);

CREATE UNIQUE INDEX note_votes_pkey ON public.note_votes USING btree (vote_id);

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

CREATE UNIQUE INDEX unique_user_author ON public.note_authors USING btree (user_id, external_id);

alter table "public"."note_authors" add constraint "note_authors_pkey" PRIMARY KEY using index "note_authors_pkey";

alter table "public"."note_requests" add constraint "note_requests_pkey" PRIMARY KEY using index "note_requests_pkey";

alter table "public"."note_votes" add constraint "note_votes_pkey" PRIMARY KEY using index "note_votes_pkey";

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."note_authors" add constraint "note_authors_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."note_authors" validate constraint "note_authors_user_id_fkey";

alter table "public"."note_authors" add constraint "unique_user_author" UNIQUE using index "unique_user_author";

alter table "public"."note_requests" add constraint "note_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."note_requests" validate constraint "note_requests_user_id_fkey";

alter table "public"."note_votes" add constraint "note_votes_note_id_fkey" FOREIGN KEY (note_id) REFERENCES notes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."note_votes" validate constraint "note_votes_note_id_fkey";

alter table "public"."notes" add constraint "notes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES note_authors(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."notes" validate constraint "notes_author_id_fkey";

alter table "public"."notes" add constraint "notes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."notes" validate constraint "notes_user_id_fkey";

grant delete on table "public"."note_authors" to "anon";

grant insert on table "public"."note_authors" to "anon";

grant references on table "public"."note_authors" to "anon";

grant select on table "public"."note_authors" to "anon";

grant trigger on table "public"."note_authors" to "anon";

grant truncate on table "public"."note_authors" to "anon";

grant update on table "public"."note_authors" to "anon";

grant delete on table "public"."note_authors" to "authenticated";

grant insert on table "public"."note_authors" to "authenticated";

grant references on table "public"."note_authors" to "authenticated";

grant select on table "public"."note_authors" to "authenticated";

grant trigger on table "public"."note_authors" to "authenticated";

grant truncate on table "public"."note_authors" to "authenticated";

grant update on table "public"."note_authors" to "authenticated";

grant delete on table "public"."note_authors" to "service_role";

grant insert on table "public"."note_authors" to "service_role";

grant references on table "public"."note_authors" to "service_role";

grant select on table "public"."note_authors" to "service_role";

grant trigger on table "public"."note_authors" to "service_role";

grant truncate on table "public"."note_authors" to "service_role";

grant update on table "public"."note_authors" to "service_role";

grant delete on table "public"."note_requests" to "anon";

grant insert on table "public"."note_requests" to "anon";

grant references on table "public"."note_requests" to "anon";

grant select on table "public"."note_requests" to "anon";

grant trigger on table "public"."note_requests" to "anon";

grant truncate on table "public"."note_requests" to "anon";

grant update on table "public"."note_requests" to "anon";

grant delete on table "public"."note_requests" to "authenticated";

grant insert on table "public"."note_requests" to "authenticated";

grant references on table "public"."note_requests" to "authenticated";

grant select on table "public"."note_requests" to "authenticated";

grant trigger on table "public"."note_requests" to "authenticated";

grant truncate on table "public"."note_requests" to "authenticated";

grant update on table "public"."note_requests" to "authenticated";

grant delete on table "public"."note_requests" to "service_role";

grant insert on table "public"."note_requests" to "service_role";

grant references on table "public"."note_requests" to "service_role";

grant select on table "public"."note_requests" to "service_role";

grant trigger on table "public"."note_requests" to "service_role";

grant truncate on table "public"."note_requests" to "service_role";

grant update on table "public"."note_requests" to "service_role";

grant delete on table "public"."note_votes" to "anon";

grant insert on table "public"."note_votes" to "anon";

grant references on table "public"."note_votes" to "anon";

grant select on table "public"."note_votes" to "anon";

grant trigger on table "public"."note_votes" to "anon";

grant truncate on table "public"."note_votes" to "anon";

grant update on table "public"."note_votes" to "anon";

grant delete on table "public"."note_votes" to "authenticated";

grant insert on table "public"."note_votes" to "authenticated";

grant references on table "public"."note_votes" to "authenticated";

grant select on table "public"."note_votes" to "authenticated";

grant trigger on table "public"."note_votes" to "authenticated";

grant truncate on table "public"."note_votes" to "authenticated";

grant update on table "public"."note_votes" to "authenticated";

grant delete on table "public"."note_votes" to "service_role";

grant insert on table "public"."note_votes" to "service_role";

grant references on table "public"."note_votes" to "service_role";

grant select on table "public"."note_votes" to "service_role";

grant trigger on table "public"."note_votes" to "service_role";

grant truncate on table "public"."note_votes" to "service_role";

grant update on table "public"."note_votes" to "service_role";

grant delete on table "public"."notes" to "anon";

grant insert on table "public"."notes" to "anon";

grant references on table "public"."notes" to "anon";

grant select on table "public"."notes" to "anon";

grant trigger on table "public"."notes" to "anon";

grant truncate on table "public"."notes" to "anon";

grant update on table "public"."notes" to "anon";

grant delete on table "public"."notes" to "authenticated";

grant insert on table "public"."notes" to "authenticated";

grant references on table "public"."notes" to "authenticated";

grant select on table "public"."notes" to "authenticated";

grant trigger on table "public"."notes" to "authenticated";

grant truncate on table "public"."notes" to "authenticated";

grant update on table "public"."notes" to "authenticated";

grant delete on table "public"."notes" to "service_role";

grant insert on table "public"."notes" to "service_role";

grant references on table "public"."notes" to "service_role";

grant select on table "public"."notes" to "service_role";

grant trigger on table "public"."notes" to "service_role";

grant truncate on table "public"."notes" to "service_role";

grant update on table "public"."notes" to "service_role";

create policy "no_access_note_authors"
on "public"."note_authors"
as permissive
for all
to public
using (false);


create policy "no_access_note_requests"
on "public"."note_requests"
as permissive
for all
to public
using (false);


create policy "no_access_note_votes"
on "public"."note_votes"
as permissive
for all
to public
using (false);


create policy "no_access_notes"
on "public"."notes"
as permissive
for all
to public
using (false);




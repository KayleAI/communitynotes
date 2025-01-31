create table "public"."auth_accounts" (
    "id" text not null,
    "account_id" text not null,
    "provider_id" text not null,
    "user_id" text not null,
    "access_token" text,
    "refresh_token" text,
    "id_token" text,
    "access_token_expires_at" timestamp without time zone,
    "scope" text,
    "password" text,
    "created_at" timestamp without time zone not null,
    "updated_at" timestamp without time zone not null
);


create table "public"."auth_jwks" (
    "id" text not null,
    "public_key" text not null,
    "private_key" text not null,
    "created_at" timestamp without time zone not null
);


create table "public"."auth_sessions" (
    "id" text not null,
    "expires_at" timestamp without time zone not null,
    "token" text not null,
    "created_at" timestamp without time zone not null,
    "updated_at" timestamp without time zone not null,
    "ip_address" text,
    "user_agent" text,
    "user_id" text not null
);


create table "public"."auth_two_factor" (
    "id" text not null,
    "secret" text not null,
    "backup_codes" text not null,
    "user_id" text not null
);


create table "public"."auth_users" (
    "id" text not null,
    "name" text not null,
    "email" text not null,
    "email_verified" boolean not null,
    "avatar" text,
    "created_at" timestamp without time zone not null,
    "updated_at" timestamp without time zone not null,
    "username" text,
    "twoFactorEnabled" boolean
);


create table "public"."auth_verification" (
    "id" text not null,
    "identifier" text not null,
    "value" text not null,
    "expires_at" timestamp without time zone not null,
    "created_at" timestamp without time zone,
    "updated_at" timestamp without time zone
);


CREATE UNIQUE INDEX auth_accounts_pkey ON public.auth_accounts USING btree (id);

CREATE UNIQUE INDEX auth_jwks_pkey ON public.auth_jwks USING btree (id);

CREATE UNIQUE INDEX auth_sessions_pkey ON public.auth_sessions USING btree (id);

CREATE UNIQUE INDEX auth_sessions_token_key ON public.auth_sessions USING btree (token);

CREATE UNIQUE INDEX auth_two_factor_pkey ON public.auth_two_factor USING btree (id);

CREATE UNIQUE INDEX auth_users_email_key ON public.auth_users USING btree (email);

CREATE UNIQUE INDEX auth_users_pkey ON public.auth_users USING btree (id);

CREATE UNIQUE INDEX auth_users_username_key ON public.auth_users USING btree (username);

CREATE UNIQUE INDEX auth_verification_pkey ON public.auth_verification USING btree (id);

alter table "public"."auth_accounts" add constraint "auth_accounts_pkey" PRIMARY KEY using index "auth_accounts_pkey";

alter table "public"."auth_jwks" add constraint "auth_jwks_pkey" PRIMARY KEY using index "auth_jwks_pkey";

alter table "public"."auth_sessions" add constraint "auth_sessions_pkey" PRIMARY KEY using index "auth_sessions_pkey";

alter table "public"."auth_two_factor" add constraint "auth_two_factor_pkey" PRIMARY KEY using index "auth_two_factor_pkey";

alter table "public"."auth_users" add constraint "auth_users_pkey" PRIMARY KEY using index "auth_users_pkey";

alter table "public"."auth_verification" add constraint "auth_verification_pkey" PRIMARY KEY using index "auth_verification_pkey";

alter table "public"."auth_accounts" add constraint "auth_accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) not valid;

alter table "public"."auth_accounts" validate constraint "auth_accounts_user_id_fkey";

alter table "public"."auth_sessions" add constraint "auth_sessions_token_key" UNIQUE using index "auth_sessions_token_key";

alter table "public"."auth_sessions" add constraint "auth_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) not valid;

alter table "public"."auth_sessions" validate constraint "auth_sessions_user_id_fkey";

alter table "public"."auth_two_factor" add constraint "auth_two_factor_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth_users(id) not valid;

alter table "public"."auth_two_factor" validate constraint "auth_two_factor_user_id_fkey";

alter table "public"."auth_users" add constraint "auth_users_email_key" UNIQUE using index "auth_users_email_key";

alter table "public"."auth_users" add constraint "auth_users_username_key" UNIQUE using index "auth_users_username_key";

grant delete on table "public"."auth_accounts" to "anon";

grant insert on table "public"."auth_accounts" to "anon";

grant references on table "public"."auth_accounts" to "anon";

grant select on table "public"."auth_accounts" to "anon";

grant trigger on table "public"."auth_accounts" to "anon";

grant truncate on table "public"."auth_accounts" to "anon";

grant update on table "public"."auth_accounts" to "anon";

grant delete on table "public"."auth_accounts" to "authenticated";

grant insert on table "public"."auth_accounts" to "authenticated";

grant references on table "public"."auth_accounts" to "authenticated";

grant select on table "public"."auth_accounts" to "authenticated";

grant trigger on table "public"."auth_accounts" to "authenticated";

grant truncate on table "public"."auth_accounts" to "authenticated";

grant update on table "public"."auth_accounts" to "authenticated";

grant delete on table "public"."auth_accounts" to "service_role";

grant insert on table "public"."auth_accounts" to "service_role";

grant references on table "public"."auth_accounts" to "service_role";

grant select on table "public"."auth_accounts" to "service_role";

grant trigger on table "public"."auth_accounts" to "service_role";

grant truncate on table "public"."auth_accounts" to "service_role";

grant update on table "public"."auth_accounts" to "service_role";

grant delete on table "public"."auth_jwks" to "anon";

grant insert on table "public"."auth_jwks" to "anon";

grant references on table "public"."auth_jwks" to "anon";

grant select on table "public"."auth_jwks" to "anon";

grant trigger on table "public"."auth_jwks" to "anon";

grant truncate on table "public"."auth_jwks" to "anon";

grant update on table "public"."auth_jwks" to "anon";

grant delete on table "public"."auth_jwks" to "authenticated";

grant insert on table "public"."auth_jwks" to "authenticated";

grant references on table "public"."auth_jwks" to "authenticated";

grant select on table "public"."auth_jwks" to "authenticated";

grant trigger on table "public"."auth_jwks" to "authenticated";

grant truncate on table "public"."auth_jwks" to "authenticated";

grant update on table "public"."auth_jwks" to "authenticated";

grant delete on table "public"."auth_jwks" to "service_role";

grant insert on table "public"."auth_jwks" to "service_role";

grant references on table "public"."auth_jwks" to "service_role";

grant select on table "public"."auth_jwks" to "service_role";

grant trigger on table "public"."auth_jwks" to "service_role";

grant truncate on table "public"."auth_jwks" to "service_role";

grant update on table "public"."auth_jwks" to "service_role";

grant delete on table "public"."auth_sessions" to "anon";

grant insert on table "public"."auth_sessions" to "anon";

grant references on table "public"."auth_sessions" to "anon";

grant select on table "public"."auth_sessions" to "anon";

grant trigger on table "public"."auth_sessions" to "anon";

grant truncate on table "public"."auth_sessions" to "anon";

grant update on table "public"."auth_sessions" to "anon";

grant delete on table "public"."auth_sessions" to "authenticated";

grant insert on table "public"."auth_sessions" to "authenticated";

grant references on table "public"."auth_sessions" to "authenticated";

grant select on table "public"."auth_sessions" to "authenticated";

grant trigger on table "public"."auth_sessions" to "authenticated";

grant truncate on table "public"."auth_sessions" to "authenticated";

grant update on table "public"."auth_sessions" to "authenticated";

grant delete on table "public"."auth_sessions" to "service_role";

grant insert on table "public"."auth_sessions" to "service_role";

grant references on table "public"."auth_sessions" to "service_role";

grant select on table "public"."auth_sessions" to "service_role";

grant trigger on table "public"."auth_sessions" to "service_role";

grant truncate on table "public"."auth_sessions" to "service_role";

grant update on table "public"."auth_sessions" to "service_role";

grant delete on table "public"."auth_two_factor" to "anon";

grant insert on table "public"."auth_two_factor" to "anon";

grant references on table "public"."auth_two_factor" to "anon";

grant select on table "public"."auth_two_factor" to "anon";

grant trigger on table "public"."auth_two_factor" to "anon";

grant truncate on table "public"."auth_two_factor" to "anon";

grant update on table "public"."auth_two_factor" to "anon";

grant delete on table "public"."auth_two_factor" to "authenticated";

grant insert on table "public"."auth_two_factor" to "authenticated";

grant references on table "public"."auth_two_factor" to "authenticated";

grant select on table "public"."auth_two_factor" to "authenticated";

grant trigger on table "public"."auth_two_factor" to "authenticated";

grant truncate on table "public"."auth_two_factor" to "authenticated";

grant update on table "public"."auth_two_factor" to "authenticated";

grant delete on table "public"."auth_two_factor" to "service_role";

grant insert on table "public"."auth_two_factor" to "service_role";

grant references on table "public"."auth_two_factor" to "service_role";

grant select on table "public"."auth_two_factor" to "service_role";

grant trigger on table "public"."auth_two_factor" to "service_role";

grant truncate on table "public"."auth_two_factor" to "service_role";

grant update on table "public"."auth_two_factor" to "service_role";

grant delete on table "public"."auth_users" to "anon";

grant insert on table "public"."auth_users" to "anon";

grant references on table "public"."auth_users" to "anon";

grant select on table "public"."auth_users" to "anon";

grant trigger on table "public"."auth_users" to "anon";

grant truncate on table "public"."auth_users" to "anon";

grant update on table "public"."auth_users" to "anon";

grant delete on table "public"."auth_users" to "authenticated";

grant insert on table "public"."auth_users" to "authenticated";

grant references on table "public"."auth_users" to "authenticated";

grant select on table "public"."auth_users" to "authenticated";

grant trigger on table "public"."auth_users" to "authenticated";

grant truncate on table "public"."auth_users" to "authenticated";

grant update on table "public"."auth_users" to "authenticated";

grant delete on table "public"."auth_users" to "service_role";

grant insert on table "public"."auth_users" to "service_role";

grant references on table "public"."auth_users" to "service_role";

grant select on table "public"."auth_users" to "service_role";

grant trigger on table "public"."auth_users" to "service_role";

grant truncate on table "public"."auth_users" to "service_role";

grant update on table "public"."auth_users" to "service_role";

grant delete on table "public"."auth_verification" to "anon";

grant insert on table "public"."auth_verification" to "anon";

grant references on table "public"."auth_verification" to "anon";

grant select on table "public"."auth_verification" to "anon";

grant trigger on table "public"."auth_verification" to "anon";

grant truncate on table "public"."auth_verification" to "anon";

grant update on table "public"."auth_verification" to "anon";

grant delete on table "public"."auth_verification" to "authenticated";

grant insert on table "public"."auth_verification" to "authenticated";

grant references on table "public"."auth_verification" to "authenticated";

grant select on table "public"."auth_verification" to "authenticated";

grant trigger on table "public"."auth_verification" to "authenticated";

grant truncate on table "public"."auth_verification" to "authenticated";

grant update on table "public"."auth_verification" to "authenticated";

grant delete on table "public"."auth_verification" to "service_role";

grant insert on table "public"."auth_verification" to "service_role";

grant references on table "public"."auth_verification" to "service_role";

grant select on table "public"."auth_verification" to "service_role";

grant trigger on table "public"."auth_verification" to "service_role";

grant truncate on table "public"."auth_verification" to "service_role";

grant update on table "public"."auth_verification" to "service_role";

alter table "public"."auth_accounts" enable row level security;

alter table "public"."auth_jwks" enable row level security;

alter table "public"."auth_sessions" enable row level security;

alter table "public"."auth_two_factor" enable row level security;

alter table "public"."auth_users" enable row level security;

alter table "public"."auth_verification" enable row level security;

create policy "no_access_auth_accounts"
on "public"."auth_accounts"
as permissive
for all
to public
using (false);


create policy "no_access_auth_jwks"
on "public"."auth_jwks"
as permissive
for all
to public
using (false);


create policy "no_access_auth_sessions"
on "public"."auth_sessions"
as permissive
for all
to public
using (false);


create policy "no_access_auth_two_factor"
on "public"."auth_two_factor"
as permissive
for all
to public
using (false);


create policy "no_access_auth_users"
on "public"."auth_users"
as permissive
for all
to public
using (false);


create policy "no_access_auth_verification"
on "public"."auth_verification"
as permissive
for all
to public
using (false);


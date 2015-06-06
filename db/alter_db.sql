-----------------------------------------------------------------
--
-- :TABLE_OWNERQL database dump
-- Author: Mikael Gulapa
-----------------------------------------------------------------

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;

--CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
--COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

\echo -----------------------------------------------------------------
\echo -- Drop Tables
\echo -----------------------------------------------------------------

\echo -----------------------------------------------------------------
\echo -- Alter Fields
\echo -----------------------------------------------------------------



\echo -----------------------------------------------------------------
\echo -- Update Fields
\echo -----------------------------------------------------------------


-- UPDATE cfg_service SET cfg_service_assets='Assets' WHERE pk_cfg_service_id=135;
-- UPDATE cfg_service SET cfg_service_assets='Assets' WHERE pk_cfg_service_id=136;
-- UPDATE cfg_service SET cfg_service_assets='Assets' WHERE pk_cfg_service_id=137;
-- UPDATE cfg_service SET cfg_service_assets='Assets' WHERE pk_cfg_service_id=138;


\echo -----------------------------------------------------------------
\echo -- Tables
\echo -----------------------------------------------------------------

\echo -----------------------------------------------------------------
\echo -- badge_credential
\echo -----------------------------------------------------------------
-- CREATE TABLE badge_credential (
--     pk_badge_credential_id bigint NOT NULL,
--     fk_appuser_id bigint NOT NULL,
--     fk_cfg_badge_credential_id bigint NOT NULL,
--     creation_date timestamp with time zone NOT NULL,
--     lastupdate_date timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public.badge_credential OWNER TO :TABLE_OWNER;
-- 
-- CREATE SEQUENCE badge_credential_pk_badge_credential_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;
-- 
-- 
-- ALTER TABLE public.badge_credential_pk_badge_credential_id_seq OWNER TO :TABLE_OWNER;
-- ALTER SEQUENCE badge_credential_pk_badge_credential_id_seq OWNED BY badge_credential.pk_badge_credential_id;

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

drop table if exists "appuser" cascade;
drop table if exists "constant" cascade;
drop table if exists "oauth" cascade;
drop table if exists "profile" cascade;

\echo -----------------------------------------------------------------
\echo -- Tables
\echo -----------------------------------------------------------------

\echo -----------------------------------------------------------------
\echo -- appuser
\echo -----------------------------------------------------------------
-- Refactor this to make it mutil user.
CREATE TABLE appuser (
    pk_appuser_id bigint NOT NULL,
    first_name character varying(25) NOT NULL,
    last_name character varying(25) NOT NULL,
    account_email character varying(50) NOT NULL,
    birthday character varying(10) NOT NULL,
    gender character varying(6) NOT NULL,
    membership_date date NOT NULL,
    last_login timestamp with time zone NOT NULL,
    account_status integer NOT NULL
);


ALTER TABLE public.appuser OWNER TO :TABLE_OWNER;

CREATE SEQUENCE appuser_pk_appuser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appuser_pk_appuser_id_seq OWNER TO :TABLE_OWNER;
ALTER SEQUENCE appuser_pk_appuser_id_seq OWNED BY appuser.pk_appuser_id;

\echo -----------------------------------------------------------------
\echo -- constant
\echo -----------------------------------------------------------------

CREATE TABLE constant (
    pk_constant_id bigint NOT NULL,
    constant_name character varying(50) NOT NULL,
    constant_value character varying NOT NULL
);


ALTER TABLE public.constant OWNER TO :TABLE_OWNER;

CREATE SEQUENCE constant_pk_constant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.constant_pk_constant_id_seq OWNER TO :TABLE_OWNER;
ALTER SEQUENCE constant_pk_constant_id_seq OWNED BY constant.pk_constant_id;


\echo -----------------------------------------------------------------
\echo -- map_appuser_agent. Maps the Service provider to their corresponding agent.
\echo -----------------------------------------------------------------
-- Sample MAP table
--CREATE TABLE map_appuser_agent (
--    pk_map_appuser_agent_id bigint NOT NULL,
--    fk_serviceprovider_appuser_id bigint NOT NULL,
--    fk_agent_id bigint NOT NULL
--);

\echo -----------------------------------------------------------------
\echo -- oauth
\echo -----------------------------------------------------------------

CREATE TABLE oauth (
    pk_oauth_id bigint NOT NULL,
    fk_appuser_id bigint NOT NULL,
    oauth_provider character varying(2) NOT NULL,
    account_id character varying NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    isprimary boolean NOT NULL
);

ALTER TABLE public.oauth OWNER TO :TABLE_OWNER;

CREATE SEQUENCE oauth_pk_oauth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.oauth_pk_oauth_id_seq OWNER TO :TABLE_OWNER;
ALTER SEQUENCE oauth_pk_oauth_id_seq OWNED BY oauth.pk_oauth_id;

\echo -----------------------------------------------------------------
\echo -- profile
\echo -----------------------------------------------------------------

CREATE TABLE profile (
    pk_profile_id bigint NOT NULL,
    fk_appuser_id bigint NOT NULL,
    url_id  character varying(50) NOT NULL,
    profile_picture character varying,
    mobile_number character varying(50) NOT NULL,
    business_email character varying(500),
    landline character varying(50),
    zip_code character varying(6),
    fk_cfg_stateprovince_id bigint NOT NULL,
    fk_cfg_citytown_id bigint NOT NULL,
    fk_cfg_barangay_id bigint NOT NULL,
    streetsubdivision character varying(100) NOT NULL,
    unitbuilding character varying(100) NOT NULL,
    google_map character varying(50),
--     identification_no_type character varying(50),
--     identification_no character varying(100),
    site_link character varying,
    regular_job character varying(100),
    privacy_level integer NOT NULL,
--     emergency_contactname character varying(50),
--     emergency_contactnumber character varying(50),
    remarks character varying
);


ALTER TABLE public.profile OWNER TO :TABLE_OWNER;

CREATE SEQUENCE profile_pk_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_pk_profile_id_seq OWNER TO :TABLE_OWNER;
ALTER SEQUENCE profile_pk_profile_id_seq OWNED BY profile.pk_profile_id;

\echo -----------------------------------------------------------------
\echo -- Set sequence
\echo -----------------------------------------------------------------

ALTER TABLE ONLY appuser ALTER COLUMN pk_appuser_id SET DEFAULT nextval('appuser_pk_appuser_id_seq'::regclass);
ALTER TABLE ONLY constant ALTER COLUMN pk_constant_id SET DEFAULT nextval('constant_pk_constant_id_seq'::regclass);
ALTER TABLE ONLY oauth ALTER COLUMN pk_oauth_id SET DEFAULT nextval('oauth_pk_oauth_id_seq'::regclass);
ALTER TABLE ONLY profile ALTER COLUMN pk_profile_id SET DEFAULT nextval('profile_pk_profile_id_seq'::regclass);

\echo -----------------------------------------------------------------
\echo -- Populate tables from CSV file
\echo -----------------------------------------------------------------

\copy appuser FROM 'appuser.csv' DELIMITERS ',' CSV;
\copy constant FROM 'constant.csv' DELIMITERS ',' CSV;
\copy oauth FROM 'oauth.csv' DELIMITERS ',' CSV;
\copy profile FROM 'profile.csv' DELIMITERS ',' CSV;

\echo -----------------------------------------------------------------
\echo -- Set sequence start value
\echo -----------------------------------------------------------------

SELECT pg_catalog.setval('appuser_pk_appuser_id_seq', 21, false);
SELECT pg_catalog.setval('constant_pk_constant_id_seq', 13, false);
SELECT pg_catalog.setval('oauth_pk_oauth_id_seq', 26, false);
SELECT pg_catalog.setval('profile_pk_profile_id_seq', 16, false);

\echo -----------------------------------------------------------------
\echo -- Enable Unique Constraints keys
\echo -----------------------------------------------------------------

ALTER TABLE ONLY appuser
    ADD CONSTRAINT unq_appuser_accountemail UNIQUE (account_email);

ALTER TABLE ONLY profile
    ADD CONSTRAINT unq_profile_urlid UNIQUE (url_id);

ALTER TABLE ONLY profile
    ADD CONSTRAINT unq_profile_mobilenumber UNIQUE (mobile_number);

ALTER TABLE ONLY profile
    ADD CONSTRAINT unq_profile_landline UNIQUE (landline);

ALTER TABLE ONLY profile
    ADD CONSTRAINT unq_profile_businessemail UNIQUE (business_email);

ALTER TABLE ONLY profile
    ADD CONSTRAINT unq_profile_fkappuser UNIQUE (fk_appuser_id);

ALTER TABLE ONLY oauth
    ADD CONSTRAINT unq_oauth_accountid_oauthprovider UNIQUE (account_id, oauth_provider);


\echo -----------------------------------------------------------------
\echo -- Enable primary keys
\echo -----------------------------------------------------------------

ALTER TABLE ONLY appuser
    ADD CONSTRAINT pk_appuser_id PRIMARY KEY (pk_appuser_id);

ALTER TABLE ONLY constant
    ADD CONSTRAINT pk_constant_id PRIMARY KEY (pk_constant_id);

ALTER TABLE ONLY oauth
    ADD CONSTRAINT pk_oauth_id PRIMARY KEY (pk_oauth_id);

ALTER TABLE ONLY profile
    ADD CONSTRAINT pk_profile_id PRIMARY KEY (pk_profile_id);

\echo -----------------------------------------------------------------
\echo -- Create Index
\echo -----------------------------------------------------------------
-- Naming Convention fki_<fieldname with no underscore>_<hosting tablename with no underscore>
CREATE INDEX fki_appuserid_oauth ON oauth USING btree (fk_appuser_id);
CREATE INDEX fki_appuserid_profile ON profile USING btree (fk_appuser_id);

\echo -----------------------------------------------------------------
\echo -- Enable Foreign Keys
\echo -----------------------------------------------------------------


ALTER TABLE ONLY oauth
    ADD CONSTRAINT fk_oauth_appuser_id FOREIGN KEY (fk_appuser_id) REFERENCES appuser(pk_appuser_id);

ALTER TABLE ONLY profile
    ADD CONSTRAINT fk_profile_appuser_id FOREIGN KEY (fk_appuser_id) REFERENCES appuser(pk_appuser_id);


-- SAMPLE
-- CREATE VIEW v_service AS
--     SELECT
---     ....
--     FROM 
--         publishedservice psvc
-- 
--         INNER JOIN
--         service svc
--         ON svc.pk_service_id = psvc.pk_publishedservice_id 
-- 
--         INNER JOIN
--         appuser usr
--         ON usr.pk_appuser_id = psvc.fk_appuser_id
-- 
--         FULL OUTER JOIN
--         profile pfl
--         ON usr.pk_appuser_id = pfl.fk_appuser_id
-- 
--         ......
-- 
--         LEFT JOIN
-- 		(
-- 			SELECT 
-- 				fk_company_id, 
-- 				MAX(expiration_date) as expiration_date 
-- 			FROM 
-- 				map_company_cfgcompanypackage 
-- 			GROUP BY 
-- 				fk_company_id
-- 		) mccp
--         ON mccp.fk_company_id = comp.pk_company_id
--         AND mccp.expiration_date  >= now()
-- 		
--     WHERE
-- 	psvc.ispublished = true
--         AND
--         psvc.service_status = 1
--         AND
--         usr.account_status = 0 -- active
--         AND
--         CASE
--             WHEN psvc.fk_employee_id IS NULL AND psvc.is_non_individual_post IS FALSE AND cfgs.priority = 0
--             THEN TRUE
--             WHEN psvc.fk_employee_id IS NOT NULL OR psvc.is_non_individual_post IS TRUE OR cfgs.priority = 1
--             THEN mccp.expiration_date  >= now()
--         END
--     ORDER BY
--         cp.priority_ranking,
--         psvc.lastupdate_date DESC;
-- 

\echo -----------------------------------------------------------------
\echo -- Create Functions
\echo -----------------------------------------------------------------

-- CREATE OR REPLACE FUNCTION f_jobpost_changes() RETURNS TRIGGER AS $t_jobpost_changes$
--     BEGIN
--         IF EXISTS (SELECT 1 from publishedjobpost WHERE pk_publishedjobpost_id = NEW.pk_jobpost_id) THEN
--             UPDATE publishedjobpost SET 
--                 fk_appuser_id = OLD.fk_appuser_id,
--                 fk_cfg_service_id = NEW.fk_cfg_service_id,
--                 jobpost_title = NEW.jobpost_title,
--                 jobpost_description = NEW.jobpost_description,
--                 mobile_number = NEW.mobile_number,
--                 landline = NEW.landline,
--                 fk_cfg_citytown_id = NEW.fk_cfg_citytown_id,
--                 fk_cfg_barangay_id = NEW.fk_cfg_barangay_id,
--                 street_address = NEW.street_address,
--                 unit_address = NEW.unit_address,
--                 google_map = NEW.google_map,
--                 creation_date = OLD.creation_date,
--                 lastupdate_date = NEW.lastupdate_date,
--                 ispublished = NEW.ispublished,
--                 jobpost_status = NEW.jobpost_status
--             WHERE pk_publishedjobpost_id = NEW.pk_jobpost_id;
--         ELSE
--             INSERT INTO publishedjobpost (
--             ...
--             );
--         END IF;
--         RETURN NULL; -- result is ignored since this is an AFTER trigger
--     END;
-- $t_jobpost_changes$ LANGUAGE plpgsql;

\echo -----------------------------------------------------------------
\echo -- Create Triggers
\echo -----------------------------------------------------------------

-- CREATE TRIGGER t_jobpost_changes
--     AFTER INSERT OR UPDATE ON jobpost
--         FOR EACH ROW 
--         WHEN (NEW.jobpost_status = 1)
--         EXECUTE PROCEDURE f_jobpost_changes();


\echo -----------------------------------------------------------------
\echo -- Manage Ownership
\echo -----------------------------------------------------------------

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM :TABLE_OWNER;
GRANT ALL ON SCHEMA public TO :TABLE_OWNER;
GRANT ALL ON SCHEMA public TO PUBLIC;
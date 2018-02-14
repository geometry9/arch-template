--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: pollapp
--

CREATE TABLE questions (
    id integer NOT NULL,
    question text,
    answers jsonb,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: pollapp
--

CREATE SEQUENCE questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pollapp
--

ALTER SEQUENCE questions_id_seq OWNED BY questions.id;


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: pollapp
--

ALTER TABLE ONLY questions ALTER COLUMN id SET DEFAULT nextval('questions_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: pollapp
--

INSERT INTO questions (id, question, answers, created_at, updated_at) VALUES (6, 'How often do you conduct surveys?', '{"Weekly": 0, "Monthly": 0, "Annually": 0, "Quarterly": 0}', '2018-02-04 11:50:18.282852', '2018-02-04 11:50:18.282852');
INSERT INTO questions (id, question, answers, created_at, updated_at) VALUES (7, 'What types of credit cards do you have?', '{"Visa": 0, "Discover": 0, "MasterCard": 0, "American Express": 0}', '2018-02-04 22:01:06.011936', '2018-02-04 22:27:18.595652');
INSERT INTO questions (id, question, answers, created_at, updated_at) VALUES (8, 'If you had to pick only from the following five, which color is your favorite?', '{"Red": 0, "Grey": 0, "Black": 0, "Green": 0, "Orange": 0, "Yellow": 0}', '2018-02-06 17:58:04.18919', '2018-02-06 17:58:04.18919');


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pollapp
--

SELECT pg_catalog.setval('questions_id_seq', 4, true);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: pollapp
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

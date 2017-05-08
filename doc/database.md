# Database

## Model

<p align="center"><img width=100% src="https://raw.githubusercontent.com/dbvis-eren-ck/collective-movement-exploration/master/media/db-uml.png"></p>

## SQL

 ```SQL

-- Table: public.role

-- DROP TABLE public.role;

CREATE SEQUENCE public.role_id_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;


CREATE TABLE public.role
    (
      id integer NOT NULL DEFAULT nextval('role_id_seq'::regclass),
      name character varying(80),
      description character varying(255),
      CONSTRAINT role_pkey PRIMARY KEY (id),
      CONSTRAINT role_name_key UNIQUE (name)
    )
    WITH (
      OIDS=FALSE
    );

-- Table: public."user"
-- DROP TABLE public."user";

CREATE SEQUENCE public.user_id_seq
	  INCREMENT 1
	  MINVALUE 1
	  MAXVALUE 9223372036854775807
	  START 3
      CACHE 1;

CREATE TABLE public."user"
      (
        id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
        first_name character varying(255),
        last_name character varying(255),
        email character varying(255),
        password character varying(255),
        active boolean,
        confirmed_at timestamp without time zone,
        CONSTRAINT user_pkey PRIMARY KEY (id),
        CONSTRAINT user_email_key UNIQUE (email)
      )
      WITH (
        OIDS=FALSE
      );

-- Table: public.roles_users
-- DROP TABLE public.roles_users;

CREATE TABLE public.roles_users
    (
        user_id integer,
        role_id integer,
        CONSTRAINT roles_users_role_id_fkey FOREIGN KEY (role_id)
          REFERENCES public.role (id) MATCH SIMPLE
              ON UPDATE NO ACTION ON DELETE NO ACTION,
          CONSTRAINT roles_users_user_id_fkey FOREIGN KEY (user_id)
              REFERENCES public."user" (id) MATCH SIMPLE
              ON UPDATE NO ACTION ON DELETE NO ACTION
        )
        WITH (
          OIDS=FALSE
        );


-- Table: public.dataset
-- DROP TABLE public.dataset;

CREATE SEQUENCE public.dataset_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;


CREATE TABLE public.dataset
   (
     id integer NOT NULL DEFAULT nextval('dataset_id_seq'::regclass),
     name character varying(255) NOT NULL,
     coordinate_origin geometry(Point) NOT NULL,
     min geometry(Point) NOT NULL,
     max geometry(Point) NOT NULL,
     user_id integer NOT NULL,
     progress integer NOT NULL,
     inverted boolean DEFAULT false,
     status character varying(255),
     error boolean DEFAULT false,
     fps integer NOT NULL DEFAULT 25,
     background character varying(255),
     CONSTRAINT dataset_pkey PRIMARY KEY (id),
     CONSTRAINT dataset_user_id_fkey FOREIGN KEY (user_id)
         REFERENCES public."user" (id) MATCH SIMPLE
         ON UPDATE NO ACTION ON DELETE NO ACTION
   )
   WITH (
     OIDS=FALSE
   );

-- Index: public.dataset_index
-- DROP INDEX public.dataset_index;

   CREATE INDEX dataset_index
     ON public.dataset
     USING btree
     (id);

   -- Index: public.idx_dataset_coordinate_origin

   -- DROP INDEX public.idx_dataset_coordinate_origin;

   CREATE INDEX idx_dataset_coordinate_origin
     ON public.dataset
     USING gist
     (coordinate_origin);

   -- Index: public.idx_dataset_max

   -- DROP INDEX public.idx_dataset_max;

   CREATE INDEX idx_dataset_max
     ON public.dataset
     USING gist
     (max);

   -- Index: public.idx_dataset_min

   -- DROP INDEX public.idx_dataset_min;

   CREATE INDEX idx_dataset_min
     ON public.dataset
     USING gist
     (min);


-- Table: public.group_data
-- DROP TABLE public.group_data;

CREATE TABLE public.group_data
      (
        dataset_id integer NOT NULL,
        "time" integer NOT NULL,
        centroid geometry(Point),
        medoid integer,
        convex_hull geometry,
        delaunay_triangulation geometry(MultiLineString),
        voronoi_polygons geometry(GeometryCollection),
        speed numeric(32,4),
        acceleration numeric(32,4),
        convex_hull_area numeric(32,4),
        metric_distance numeric(32,4),
        CONSTRAINT group_data_pkey PRIMARY KEY (dataset_id, "time"),
        CONSTRAINT group_data_dataset_fk FOREIGN KEY (dataset_id)
            REFERENCES public.dataset (id) MATCH SIMPLE
            ON UPDATE NO ACTION ON DELETE CASCADE
      )
      WITH (
        OIDS=FALSE
      );

      -- Index: public.group_data_index

      -- DROP INDEX public.group_data_index;

      CREATE INDEX group_data_index
        ON public.group_data
        USING btree
        (dataset_id, "time");

      -- Index: public.idx_group_data_centroid

      -- DROP INDEX public.idx_group_data_centroid;

      CREATE INDEX idx_group_data_centroid
        ON public.group_data
        USING gist
        (centroid);

      -- Index: public.idx_group_data_convex_hull

      -- DROP INDEX public.idx_group_data_convex_hull;

      CREATE INDEX idx_group_data_convex_hull
        ON public.group_data
        USING gist
        (convex_hull);

      -- Index: public.idx_group_data_delaunay_triangulation

      -- DROP INDEX public.idx_group_data_delaunay_triangulation;

      CREATE INDEX idx_group_data_delaunay_triangulation
        ON public.group_data
        USING gist
        (delaunay_triangulation);

      -- Index: public.idx_group_data_voronoi_polygons

      -- DROP INDEX public.idx_group_data_voronoi_polygons;

      CREATE INDEX idx_group_data_voronoi_polygons
        ON public.group_data
        USING gist
        (voronoi_polygons);

        -- Table: public.metadata

        -- DROP TABLE public.metadata;

CREATE TABLE public.metadata
        (
          dataset_id integer NOT NULL,
          animal_id integer NOT NULL,
          species character varying(255) NOT NULL,
          sex character varying(255) NOT NULL,
          size double precision,
          weight double precision,
          CONSTRAINT metadata_pkey PRIMARY KEY (dataset_id, animal_id),
          CONSTRAINT metadata_dataset_fk FOREIGN KEY (dataset_id)
              REFERENCES public.dataset (id) MATCH SIMPLE
              ON UPDATE NO ACTION ON DELETE CASCADE
        )
        WITH (
          OIDS=FALSE
        );

        -- Index: public.metadata_index

        -- DROP INDEX public.metadata_index;

        CREATE INDEX metadata_index
          ON public.metadata
          USING btree
          (dataset_id, animal_id);

          -- Table: public.movement_data

          -- DROP TABLE public.movement_data;

CREATE TABLE public.movement_data
          (
            dataset_id integer NOT NULL,
            animal_id integer NOT NULL,
            "time" integer NOT NULL,
            "position" geometry(Point),
            metric_distance numeric(32,4),
            speed numeric(32,4),
            acceleration numeric(32,4),
            distance_centroid numeric(32,4),
            CONSTRAINT movement_data_pkey PRIMARY KEY (dataset_id, animal_id, "time"),
            CONSTRAINT movement_data_dataset_fk FOREIGN KEY (dataset_id)
                REFERENCES public.dataset (id) MATCH SIMPLE
                ON UPDATE NO ACTION ON DELETE CASCADE
          )
          WITH (
            OIDS=FALSE
          );

          -- Index: public.idx_movement_data_position

          -- DROP INDEX public.idx_movement_data_position;

          CREATE INDEX idx_movement_data_position
            ON public.movement_data
            USING gist
            ("position");

          -- Index: public.movement_data_index

          -- DROP INDEX public.movement_data_index;

          CREATE INDEX movement_data_index
            ON public.movement_data
            USING btree
            (dataset_id, "time", animal_id);

            -- Table: public.percentile

            -- DROP TABLE public.percentile;

CREATE TABLE public.percentile
            (
              dataset_id integer NOT NULL,
              feature character varying NOT NULL,
              min double precision,
              percentile_1 double precision,
              percentile_2 double precision,
              percentile_3 double precision,
              percentile_4 double precision,
              percentile_5 double precision,
              percentile_6 double precision,
              percentile_7 double precision,
              percentile_8 double precision,
              percentile_9 double precision,
              max double precision,
              CONSTRAINT percentile_pkey PRIMARY KEY (dataset_id, feature),
              CONSTRAINT percentile_dataset_fk FOREIGN KEY (dataset_id)
                  REFERENCES public.dataset (id) MATCH SIMPLE
                  ON UPDATE NO ACTION ON DELETE CASCADE
            )
            WITH (
              OIDS=FALSE
            );

```

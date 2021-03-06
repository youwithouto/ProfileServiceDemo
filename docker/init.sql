CREATE SCHEMA demo;

CREATE TABLE demo.profile
(
    "ID"          INT GENERATED BY DEFAULT AS IDENTITY,
    "Name"        VARCHAR(255) NOT NULL DEFAULT '',
    "Gender"      CHAR(1)      NOT NULL,
    "Dob"         DATE         NOT NULL,
    "Postcode"    SMALLINT     NOT NULL,
    "PhoneNumber" VARCHAR(255) NOT NULL DEFAULT ''
);

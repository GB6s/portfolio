CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
    "user_id" uuid NOT NULL DEFAULT uuid_generate_v1(),
    "username" varchar(20) NOT NULL,
    "password_hash" varchar(60) NOT NULL
)
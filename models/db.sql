-- ENUM 타입 정의
DROP TYPE IF EXISTS question_type CASCADE;
DROP TABLE IF EXISTS "Question" CASCADE;

CREATE TYPE question_type AS ENUM (
    'MULTIPLE_CHOICE',
    'SUBJECTIVE_QUESTION',
    'CHECKBOX',
    'DROPDOWN'
);

-- User 테이블 생성
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

-- Survey 테이블 생성
CREATE TABLE IF NOT EXISTS "Survey" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500) NULL,
    "open" BOOLEAN NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "font" VARCHAR(50) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "button_style" VARCHAR(50) NOT NULL,
    "main_image_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "deadline" TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "User"("id")
);

-- Question 테이블 생성
CREATE TABLE IF NOT EXISTS "Question" (
    "id" SERIAL PRIMARY KEY,
    "survey_id" INT NULL,
    "type" question_type NOT NULL,
    "content" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("survey_id") REFERENCES "Survey"("id")
);

-- Choice 테이블 생성
CREATE TABLE IF NOT EXISTS "Choice" (
    "id" SERIAL PRIMARY KEY,
    "question_id" INT NOT NULL,
    "option" VARCHAR(100) NOT NULL,
    "count" INT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("question_id") REFERENCES "Question"("id")
);

-- Answer 테이블 생성
CREATE TABLE IF NOT EXISTS "Answer" (
    "id" SERIAL PRIMARY KEY,
    "question_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "sub_content" VARCHAR(500),
    "obj_content" VARCHAR(500),
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,
    FOREIGN KEY ("question_id") REFERENCES "Question"("id"),
    FOREIGN KEY ("user_id") REFERENCES "User"("id")
);

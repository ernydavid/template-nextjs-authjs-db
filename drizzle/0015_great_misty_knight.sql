ALTER TABLE "user" DROP CONSTRAINT "user_country_countries_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_job_position_job_position_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_work_department_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "identification";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "country";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_1";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_2";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "bornDate";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "blood_type";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "job_position";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "work_department";
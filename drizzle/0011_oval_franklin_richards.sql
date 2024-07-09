ALTER TYPE "role" ADD VALUE 'management';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'manager';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_name" text NOT NULL,
	"iso_2_name" text,
	"iso_3_name" text,
	"code_phone" text,
	"created" timestamp DEFAULT now(),
	CONSTRAINT "countries_country_name_unique" UNIQUE("country_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"idEmployee" uuid,
	"hire_date" timestamp,
	"salary" numeric,
	"contract_status" text DEFAULT 'active',
	"end_contract" timestamp,
	"extra_salary" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emergency_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_employee" uuid,
	"contacts" json DEFAULT '{"contacts":[{"id":1,"name":"","address":"","phone":""},{"id":2,"name":"","address":"","phone":""}]}'::json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_position" (
	"id" serial PRIMARY KEY NOT NULL,
	"position_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"department_name" text,
	"created at" timestamp DEFAULT now(),
	CONSTRAINT "departments_department_name_unique" UNIQUE("department_name")
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'employee';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "identification" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "country" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_1" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_2" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bornDate" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "blood_type" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "job_position" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "work_department" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_country_countries_id_fk" FOREIGN KEY ("country") REFERENCES "countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_job_position_job_position_id_fk" FOREIGN KEY ("job_position") REFERENCES "job_position"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_work_department_departments_id_fk" FOREIGN KEY ("work_department") REFERENCES "departments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts" ADD CONSTRAINT "contracts_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_id_employee_user_id_fk" FOREIGN KEY ("id_employee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

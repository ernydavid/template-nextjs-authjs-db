CREATE TABLE IF NOT EXISTS "personalEmployeeInformation" (
	"id" serial PRIMARY KEY NOT NULL,
	"idEmployee" text,
	"idDocument" text,
	"address" text,
	"phone" text,
	"cellPhone" text,
	"birthDate" timestamp,
	"bloodType" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personalEmployeeInformation" ADD CONSTRAINT "personalEmployeeInformation_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

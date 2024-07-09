ALTER TABLE "employee_position" ADD COLUMN "iso_2_name" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_position" ADD CONSTRAINT "employee_position_employee_country_countries_country_name_fk" FOREIGN KEY ("employee_country") REFERENCES "countries"("country_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

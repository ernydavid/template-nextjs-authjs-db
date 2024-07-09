ALTER TABLE "employee_position" RENAME TO "employeePosition";--> statement-breakpoint
ALTER TABLE "employeePosition" DROP CONSTRAINT "employee_position_idEmployee_user_id_fk";
--> statement-breakpoint
ALTER TABLE "employeePosition" DROP CONSTRAINT "employee_position_employee_country_countries_country_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeePosition" ADD CONSTRAINT "employeePosition_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeePosition" ADD CONSTRAINT "employeePosition_employee_country_countries_country_name_fk" FOREIGN KEY ("employee_country") REFERENCES "countries"("country_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

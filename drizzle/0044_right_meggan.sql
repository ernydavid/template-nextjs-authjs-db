ALTER TABLE "employeePosition" RENAME COLUMN "employee-department" TO "employeeDepartment";--> statement-breakpoint
ALTER TABLE "employeePosition" RENAME COLUMN "employee_position" TO "employeePosition";--> statement-breakpoint
ALTER TABLE "employeePosition" RENAME COLUMN "employee_country" TO "employeeCountry";--> statement-breakpoint
ALTER TABLE "employeePosition" RENAME COLUMN "iso_2_name" TO "iso2Name";--> statement-breakpoint
ALTER TABLE "employeePosition" DROP CONSTRAINT "employeePosition_employee_country_countries_country_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeePosition" ADD CONSTRAINT "employeePosition_employeeCountry_countries_country_name_fk" FOREIGN KEY ("employeeCountry") REFERENCES "countries"("country_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

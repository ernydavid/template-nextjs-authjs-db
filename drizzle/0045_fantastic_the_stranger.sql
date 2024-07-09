ALTER TABLE "employeePosition" RENAME TO "employeesPositions";--> statement-breakpoint
ALTER TABLE "employeesPositions" DROP CONSTRAINT "employeePosition_idEmployee_user_id_fk";
--> statement-breakpoint
ALTER TABLE "employeesPositions" DROP CONSTRAINT "employeePosition_employeeCountry_countries_country_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeesPositions" ADD CONSTRAINT "employeesPositions_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeesPositions" ADD CONSTRAINT "employeesPositions_employeeCountry_countries_country_name_fk" FOREIGN KEY ("employeeCountry") REFERENCES "countries"("country_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

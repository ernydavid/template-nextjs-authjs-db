DROP TABLE "contracts";--> statement-breakpoint
ALTER TABLE "contracts_table" RENAME TO "employeeContracts";--> statement-breakpoint
ALTER TABLE "employeeContracts" DROP CONSTRAINT "contracts_table_idEmployee_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeeContracts" ADD CONSTRAINT "employeeContracts_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

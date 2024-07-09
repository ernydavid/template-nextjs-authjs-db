ALTER TABLE "employeesContractsTable" DROP CONSTRAINT "employeesContractsTable_employeeId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "employeesContractsTable" ADD COLUMN "idEmployee" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeesContractsTable" ADD CONSTRAINT "employeesContractsTable_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employeesContractsTable" DROP COLUMN IF EXISTS "employeeId";
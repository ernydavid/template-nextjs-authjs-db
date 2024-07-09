ALTER TABLE "employeesContractsTable" RENAME TO "contracts_table";--> statement-breakpoint
ALTER TABLE "contracts_table" DROP CONSTRAINT "employeesContractsTable_idEmployee_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts_table" ADD CONSTRAINT "contracts_table_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

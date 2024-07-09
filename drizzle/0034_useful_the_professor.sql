ALTER TABLE "contracts" RENAME COLUMN "idEmployee" TO "employee_id";--> statement-breakpoint
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_idEmployee_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts" ADD CONSTRAINT "contracts_employee_id_user_id_fk" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

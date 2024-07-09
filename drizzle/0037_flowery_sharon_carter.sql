CREATE TABLE IF NOT EXISTS "employeesContractsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"employeeId" text,
	"hireDate" timestamp,
	"salary" numeric,
	"contractType" text,
	"contractEndDate" timestamp,
	"extraSalary" numeric,
	"createdAt" timestamp
);
--> statement-breakpoint
DROP TABLE "employeeSalary";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeesContractsTable" ADD CONSTRAINT "employeesContractsTable_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "employeeSalary" (
	"id" serial PRIMARY KEY NOT NULL,
	"employeeId" text,
	"hireDate" timestamp,
	"salary" numeric,
	"contractStatus" text,
	"contractEndDate" timestamp,
	"extraSalary" numeric,
	"createdAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeeSalary" ADD CONSTRAINT "employeeSalary_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

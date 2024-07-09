CREATE TABLE IF NOT EXISTS "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"idEmployee" text,
	"hireDate" timestamp,
	"salary" numeric,
	"contractStatus" text DEFAULT 'active',
	"endContract" timestamp,
	"extraSalary" numeric,
	"createdAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts" ADD CONSTRAINT "contracts_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

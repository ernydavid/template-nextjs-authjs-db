CREATE TABLE IF NOT EXISTS "employee_position" (
	"id" serial PRIMARY KEY NOT NULL,
	"idEmployee" text,
	"employee_departments" json,
	"employee_positions" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_position" ADD CONSTRAINT "employee_position_idEmployee_user_id_fk" FOREIGN KEY ("idEmployee") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "employeeTimeOff" (
	"id" uuid PRIMARY KEY NOT NULL,
	"employeeId" text,
	"startDate" timestamp,
	"endDate" timestamp,
	"status" text,
	"created" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employeeTimeOff" ADD CONSTRAINT "employeeTimeOff_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "employeeTimeOff" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employeeTimeOff" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "employeeTimeOff" ADD COLUMN "updatedAt" timestamp;
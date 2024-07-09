ALTER TABLE "job_position" RENAME TO "positions";--> statement-breakpoint
ALTER TABLE "positions" RENAME COLUMN "position_name" TO "name";--> statement-breakpoint
ALTER TABLE "positions" ADD COLUMN "created" timestamp;
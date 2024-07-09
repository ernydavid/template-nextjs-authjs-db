ALTER TABLE "emergency_contacts" RENAME COLUMN "contacts" TO "contact_name";--> statement-breakpoint
ALTER TABLE "emergency_contacts" ALTER COLUMN "contact_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "emergency_contacts" ALTER COLUMN "contact_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "emergency_contacts" ADD COLUMN "contact_address" text;--> statement-breakpoint
ALTER TABLE "emergency_contacts" ADD COLUMN "contact_phone" text;
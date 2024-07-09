ALTER TABLE "user" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_uuid_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

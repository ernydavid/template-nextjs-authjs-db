CREATE TABLE IF NOT EXISTS "twoFactorConfirmation" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorToken" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text,
	"expires" timestamp,
	CONSTRAINT "twoFactorToken_token_unique" UNIQUE("token"),
	CONSTRAINT "twoFactorToken_email_token_unique" UNIQUE("email","token")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isTwoFactorEnabled" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactorConfirmation" ADD CONSTRAINT "twoFactorConfirmation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

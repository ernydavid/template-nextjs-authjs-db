CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text,
	"expires" timestamp,
	CONSTRAINT "passwordResetToken_token_unique" UNIQUE("token"),
	CONSTRAINT "passwordResetToken_email_token_unique" UNIQUE("email","token")
);

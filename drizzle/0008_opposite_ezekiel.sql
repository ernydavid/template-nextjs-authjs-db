CREATE TABLE IF NOT EXISTS "verificationToken" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text,
	"expires" timestamp,
	CONSTRAINT "verificationToken_token_unique" UNIQUE("token"),
	CONSTRAINT "verificationToken_email_token_unique" UNIQUE("email","token")
);

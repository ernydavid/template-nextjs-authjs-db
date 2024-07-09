ALTER TABLE "contracts" RENAME COLUMN "endContract" TO "contractEndDate";--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "contractStatus" DROP DEFAULT;
ALTER TABLE "contracts" RENAME COLUMN "contract_status" TO "contractStatus";--> statement-breakpoint
ALTER TABLE "contracts" RENAME COLUMN "end_contract" TO "endContract";--> statement-breakpoint
ALTER TABLE "contracts" RENAME COLUMN "extra_salary" TO "extraSalary";--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "createdAt" timestamp;
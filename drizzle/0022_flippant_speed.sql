ALTER TABLE "employee_position" RENAME COLUMN "employee_departments" TO "employee-department";--> statement-breakpoint
ALTER TABLE "employee_position" RENAME COLUMN "employee_positions" TO "employee_position";--> statement-breakpoint
ALTER TABLE "employee_position" ALTER COLUMN "employee-department" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "employee_position" ALTER COLUMN "employee_position" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "employee_position" ADD COLUMN "employee_country" text;
ALTER TABLE "departments" RENAME COLUMN "department_name" TO "name";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "departments_department_name_unique";--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_name_unique" UNIQUE("name");
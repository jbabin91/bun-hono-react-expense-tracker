ALTER TABLE "expenses" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
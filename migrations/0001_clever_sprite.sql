ALTER TABLE "book" DROP CONSTRAINT "book_author_author_name_fk";
--> statement-breakpoint
ALTER TABLE "book" DROP CONSTRAINT "book_category_category_category_fk";
--> statement-breakpoint
ALTER TABLE "author" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_author_author_id_fk" FOREIGN KEY ("author") REFERENCES "author"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

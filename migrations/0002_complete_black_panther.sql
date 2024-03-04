DO $$ BEGIN
 ALTER TABLE "book" ADD CONSTRAINT "book_category_category_category_fk" FOREIGN KEY ("category") REFERENCES "category"("category") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

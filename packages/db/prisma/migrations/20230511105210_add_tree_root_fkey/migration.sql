-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupRoot_fkey" FOREIGN KEY ("groupRoot") REFERENCES "Tree"("root") ON DELETE RESTRICT ON UPDATE CASCADE;

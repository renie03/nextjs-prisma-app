import { prisma } from "@/lib/prisma";
import Categories from "./Categories";
import { Category, Post } from "@prisma/client";
import PostItem from "./PostItem";

const PostList = async ({ category }: { category: string }) => {
  const posts: Post[] = await prisma.post.findMany({
    where: category ? { category: category as Category } : {},
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Recent Posts</h1>
      <Categories />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

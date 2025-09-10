import { prisma } from "@/lib/prisma";
import PostItem from "./PostItem";
import { Post } from "@prisma/client";

const FeaturedPosts = async () => {
  const posts: Post[] = await prisma.post.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="mb-15">
      <h1 className="text-2xl font-bold mb-5">Featured Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;

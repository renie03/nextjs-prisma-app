import { Category, Post, Prisma } from "@prisma/client";
import Filters from "./Filters";
import Pagination from "./Pagination";
import PostItem from "./PostItem";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/constants";

const PaginatedPostList = async ({
  page,
  category,
  sort,
  q,
}: {
  page: number;
  category?: string;
  sort?: string;
  q?: string;
}) => {
  const query: Prisma.PostWhereInput = {};

  if (category) {
    query.category = category as Category;
  }

  if (q) {
    query.title = {
      contains: q,
      mode: "insensitive",
    };
  }

  const orderBy: Prisma.PostOrderByWithRelationInput =
    sort === "popular"
      ? { visit: "desc" }
      : sort === "oldest"
      ? { createdAt: "asc" }
      : { createdAt: "desc" };

  // const posts: Post[] = await prisma.post.findMany({
  //   where: query,
  //   orderBy,
  //   // orderBy:
  //   //   sort === "popular"
  //   //     ? { visit: "desc" }
  //   //     : sort === "oldest"
  //   //     ? { createdAt: "asc" }
  //   //     : { createdAt: "desc" },
  //   take: ITEM_PER_PAGE,
  //   skip: ITEM_PER_PAGE * (page - 1),
  // });

  // const totalPosts: number = await prisma.post.count({
  //   where: query,
  // });

  const [posts, totalPosts]: [Post[], number] = await prisma.$transaction([
    prisma.post.findMany({
      where: query,
      orderBy,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),

    prisma.post.count({
      where: query,
    }),
  ]);

  return (
    <div>
      <Filters />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <Pagination totalData={totalPosts} />
    </div>
  );
};
export default PaginatedPostList;

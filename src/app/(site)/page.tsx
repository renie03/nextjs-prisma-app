import FeaturedPosts from "@/components/site/FeaturedPosts";
import PostList from "@/components/site/PostList";
import Link from "next/link";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const category = (await searchParams).category || "";

  return (
    <div>
      <FeaturedPosts />
      <PostList category={category} />
      <Link
        href={category ? `/posts/?category=${category}` : "/posts"}
        className="flex justify-end mt-4 underline text-sm text-textSoft"
      >
        View all posts
      </Link>
    </div>
  );
};

export default HomePage;

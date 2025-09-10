import Link from "next/link";
import Image from "next/image";
import { format } from "timeago.js";
import { Post } from "@prisma/client";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div key={post.id} className="flex flex-col">
      <Link href={`/posts/${post.id}`} className="relative w-full aspect-[2/1]">
        <Image
          src={post.img || "/noproduct.jpg"}
          fill
          className="rounded-xl"
          alt={post.title}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <h1 className="text-lg font-medium mt-1">{post.title}</h1>
      <div className="flex items-center justify-between">
        <h2>{post.category}</h2>
        <span className="text-textSoft text-sm">{format(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default PostItem;

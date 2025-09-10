import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const userId = session.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: {
        likes: true,
        dislikes: true,
        likesCount: true,
        dislikesCount: true,
      },
    });
    if (!comment) return new Response("Comment not found", { status: 404 });

    const hasLiked = comment.likes.includes(userId);
    const hasDisliked = comment.dislikes.includes(userId);

    if (!hasDisliked) {
      await prisma.comment.update({
        where: { id },
        data: {
          dislikes: [...comment.dislikes, userId],
          dislikesCount: { increment: 1 },
        },
      });

      // Remove like if present
      if (hasLiked) {
        await prisma.comment.update({
          where: { id },
          data: {
            likes: comment.likes.filter((uid) => uid !== userId),
            likesCount: { decrement: 1 },
          },
        });
      }
    } else {
      await prisma.comment.update({
        where: { id },
        data: {
          dislikes: comment.dislikes.filter((uid) => uid !== userId),
          dislikesCount: { decrement: 1 },
        },
      });
    }

    return new Response(
      !hasDisliked
        ? "Comment has been disliked"
        : "Comment dislike has been removed",
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to update comment!", { status: 500 });
  }
}

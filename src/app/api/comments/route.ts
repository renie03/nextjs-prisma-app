import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CommentSchema } from "@/lib/validationSchemas";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const cursor = Number(searchParams.get("cursor")) || 0;
  const postId = searchParams.get("postId");

  const LIMIT = 3;

  if (!postId) {
    return new Response("Missing postId", { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      skip: cursor * LIMIT,
      include: {
        user: { select: { name: true, image: true } },
      },
    });

    const hasNextPage = comments.length === LIMIT;

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return new Response(
      JSON.stringify({ comments, nextCursor: hasNextPage ? cursor + 1 : null }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch comments!", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  // const { postId, desc } = body;

  const validatedFields = CommentSchema.safeParse(body);
  if (!validatedFields.success) {
    return new Response("Invalid input", { status: 400 });
  }

  const { postId, desc } = validatedFields.data;

  if (!postId) {
    return new Response("Missing postId", { status: 400 });
  }

  try {
    await prisma.comment.create({
      data: {
        userId: session.user.id,
        postId,
        desc,
      },
    });
    return new Response("Comment has been created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create comment!", { status: 500 });
  }
}

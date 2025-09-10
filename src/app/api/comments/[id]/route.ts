import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommentSchema } from "@/lib/validationSchemas";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  // const { desc } = body;

  const validatedFields = CommentSchema.safeParse(body);
  if (!validatedFields.success) {
    return new Response("Invalid input", { status: 400 });
  }

  const { desc } = validatedFields.data;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) return new Response("Comment not found", { status: 404 });

    if (session.user.id !== comment.userId) {
      return new Response("You can update only your comment", {
        status: 403,
      });
    }

    await prisma.comment.update({
      where: { id },
      data: { desc },
    });

    return new Response("Comment has been updated", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update comment!", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) return new Response("Comment not found", { status: 404 });

    if (session.user.id !== comment.userId) {
      return new Response("You can delete only your comment", {
        status: 403,
      });
    }

    await prisma.comment.delete({
      where: { id },
    });

    return new Response("Comment has been deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete comment!", { status: 500 });
  }
}

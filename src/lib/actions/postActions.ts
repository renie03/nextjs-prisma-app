"use server";

import { prisma } from "../prisma";
import { auth } from "../auth";
import { postSchema } from "../validationSchemas";

export const createPost = async (
  previousState: { success: boolean; message: string },
  data: unknown
) => {
  const validatedFields = postSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "",
    };
  }

  const { title, desc, img, category, isFeatured } = validatedFields.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  try {
    const existingTitle = await prisma.post.findUnique({
      where: { title },
    });
    if (existingTitle) {
      return {
        success: false,
        message: "Title already exists",
      };
    }

    await prisma.post.create({
      data: {
        userId: session.user.id,
        title,
        desc,
        img,
        category,
        isFeatured: isFeatured === "true",
      },
    });

    return { success: true, message: "Post has been created" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updatePost = async (
  previousState: { success: boolean; message: string },
  data: unknown
) => {
  const validatedFields = postSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "",
    };
  }

  const { id, title, desc, img, category, isFeatured } = validatedFields.data;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  try {
    const existingTitle = await prisma.post.findUnique({
      where: { title },
    });
    if (existingTitle && existingTitle.id !== id) {
      return {
        success: false,
        message: "Title already exists",
      };
    }

    await prisma.post.update({
      where: { id },
      data: { title, desc, img, category, isFeatured: isFeatured === "true" },
    });

    return { success: true, message: "Post has been updated" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deletePost = async (
  previousState: { success: boolean; message: string },
  formData: FormData
) => {
  const id = formData.get("id") as string;

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return {
      success: false,
      message: "Admin only",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "Invalid post ID",
    };
  }

  try {
    await prisma.post.delete({
      where: { id },
    });

    return { success: true, message: "Post has been deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

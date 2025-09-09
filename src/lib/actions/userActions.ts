"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, userSchema } from "../validationSchemas";
import { AuthError } from "next-auth";

export const handleGoogleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const handleGithubLogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const handleLogout = async () => {
  await signOut({ redirectTo: "/" });
};

export const register = async (
  previousState: { success: boolean; message: string },
  data: unknown
) => {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "",
    };
  }

  const { username, email, name, password, image } = validatedFields.data;

  try {
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const existingName = await prisma.user.findUnique({
      where: { name },
    });
    if (existingName) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        image,
      },
    });

    return { success: true, message: "You have registered successfully." };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const login = async (
  previousState: { success: boolean; message: string },
  data: unknown
) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "",
    };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", { username, password, redirectTo: "/" });
    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid Credentials",
          };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const updateUser = async (
  previousState: { success: boolean; message: string },
  data: unknown
) => {
  const validatedFields = userSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "",
    };
  }

  const { username, email, name, password, image } = validatedFields.data;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername && existingUsername.id !== userId) {
        return {
          success: false,
          message: "Username already exists",
        };
      }
    }

    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail && existingEmail.id !== userId) {
        return {
          success: false,
          message: "Email already exists",
        };
      }
    }

    const existingName = await prisma.user.findUnique({
      where: { name },
    });
    if (existingName && existingName.id !== userId) {
      return {
        success: false,
        message: "Name already exists",
      };
    }

    const updateFields: {
      username?: string;
      email?: string;
      name?: string;
      image?: string;
      password?: string;
    } = {
      username,
      email,
      name,
      image,
    };

    // Hash password if provided and not just whitespace
    if (password && password.trim() !== "") {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateFields,
    });

    return { success: true, message: "User has been updated" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

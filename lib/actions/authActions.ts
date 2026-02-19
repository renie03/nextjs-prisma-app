"use server";

import { signIn, signOut } from "@/lib/auth";

export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async (
  previousState: { success: boolean; message: string },
  formData: FormData,
) => {
  try {
    await signOut({ redirect: false });
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

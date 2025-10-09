'use server';
import { api } from "@/helper/axios";
import { LoginUserData, loginUserSchema } from "@/validators/loginUser";
import { cookies } from "next/headers";

export async function loginUser(data: LoginUserData) {
  const validatedData = loginUserSchema.parse(data);
  const cookiesStore = await cookies();

  if (!validatedData) {
    throw new Error("Invalid data");
  }

  try {
    const response = await api.post("/auth/login", validatedData);
    console.log(response.data.data);
    if (response.status !== 200) {
      throw new Error("Error logging in");
    }

    cookiesStore.set({
      name: "accessToken",
      value: response.data.data.accessToken,
      httpOnly: false,
      maxAge: response.data.data.expiresIn,

    });
    cookiesStore.set({
      name: "refreshToken",
      value: response.data.data.refreshToken,
      httpOnly: false,
      maxAge: response.data.data.refreshTokenExpiresIn,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in");
  }
}

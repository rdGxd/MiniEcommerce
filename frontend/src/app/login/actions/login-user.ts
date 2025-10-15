'use server';
import { api } from "@/helper/axios";
import { LoginUserData, loginUserSchema } from "@/validators/loginUser";
import Cookies from "js-cookie";

export async function loginUser(data: LoginUserData) {
  const validatedData = loginUserSchema.parse(data);

  if (!validatedData) {
    throw new Error("Invalid data");
  }

  try {
    const response = await api.post("/auth/login", validatedData);
    if (response.status !== 200) {
      throw new Error("Error logging in");
    }

    Cookies.set("accessToken", response.data.data.accessToken, {
      expires: response.data.data.expiresIn,
    });

    Cookies.set("refreshToken", response.data.data.refreshToken, {
      expires: response.data.data.refreshTokenExpiresIn,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in");
  }
}

"use server";

import { api } from "@/helper/axios";
import { SignupUserData, signupUserSchema } from "@/validators/signupUser";

export const createUser = async (data: SignupUserData) => {
  const validatedData = signupUserSchema.parse(data);

  if (!validatedData) {
    throw new Error("Invalid data");
  }

  try {
    const response = await api.post("/auth/register", validatedData);
    console.log(response);
    if (response.status !== 201) {
      throw new Error("Error creating user");
    }
    return response.data;
  } catch {
    throw new Error("Error creating user");
  }
};

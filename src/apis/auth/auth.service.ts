import axiosInstance, { rawAxios } from "@/utils/axios";
import {
  AuthResponse,
  LoginFormType,
  RefreshResponse,
  SignupFormType,
} from "./auth.type";

export const signUp = async (data: SignupFormType) => {
  const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

export const signIn = async (data: LoginFormType) => {
  const response = await rawAxios.post<AuthResponse>("/auth/signin", data);
  return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await rawAxios.post<RefreshResponse>("/auth/refresh", {
    refreshToken,
  });
  return response.data;
};

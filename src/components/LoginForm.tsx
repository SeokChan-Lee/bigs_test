"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormType } from "@/apis/auth/auth.type";
import { signIn } from "@/apis/auth/auth.service";
import Input from "./Input";
import Spinner from "./Spinner";
import Button from "./Button";
import { parseJwt } from "@/utils/parseJwt";
import { useUserStore } from "@/store/userStore";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await signIn(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      const parsed = parseJwt(response.accessToken);
      if (parsed) {
        useUserStore.getState().setUser(parsed);
      }

      window.location.href = "/boards";
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <Input
        {...register("username")}
        type="email"
        placeholder="이메일"
        label="이메일"
        error={errors.username?.message}
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="비밀번호"
        label="비밀번호"
        error={errors.password?.message}
      />
      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? <Spinner /> : "로그인"}
      </Button>
    </form>
  );
}

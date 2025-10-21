"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, type SignupFormType } from "@/apis/auth/auth.type";
import { signUp } from "@/apis/auth/auth.service";
import Input from "./Input";
import Spinner from "./Spinner";
import Button from "./Button";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      await signUp(data);
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 mb-30"
    >
      <Input
        {...register("username")}
        type="email"
        placeholder="이메일"
        label="이메일"
        error={errors.username?.message}
      />
      <Input
        {...register("name")}
        type="text"
        placeholder="이름"
        label="이름"
        error={errors.name?.message}
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="비밀번호"
        label="비밀번호"
        error={errors.password?.message}
      />
      <Input
        {...register("confirmPassword")}
        type="password"
        placeholder="비밀번호 확인"
        label="비밀번호 확인"
        error={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="mt-3 md:mt-5"
      >
        {isSubmitting ? <Spinner /> : "회원가입"}
      </Button>
    </form>
  );
}

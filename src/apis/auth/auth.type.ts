import { z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!%*#?&])[a-zA-Z\d!%*#?&]+$/;

export const AUTH_VALIDATION = {
  USERNAME: {
    REQUIRED_MESSAGE: "이메일은 필수 입력입니다.",
    INVALID_MESSAGE: "이메일 형식으로 작성해 주세요.",
  },
  NAME: {
    REQUIRED_MESSAGE: "이름은 필수 입력입니다.",
  },
  PASSWORD: {
    REQUIRED_MESSAGE: "비밀번호는 필수 입력입니다.",
    MIN_LENGTH: PASSWORD_MIN_LENGTH,
    MIN_MESSAGE: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상입니다.`,
    PATTERN: PASSWORD_PATTERN,
    PATTERN_MESSAGE:
      "비밀번호는 영문, 숫자, 특수문자(!%*#?&)를 모두 포함해야 합니다.",
  },
  PASSWORD_CONFIRMATION: {
    REQUIRED_MESSAGE: "비밀번호 확인을 입력해 주세요.",
    MISMATCH_MESSAGE: "비밀번호가 일치하지 않습니다.",
  },
};

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(1, AUTH_VALIDATION.USERNAME.REQUIRED_MESSAGE)
      .email(AUTH_VALIDATION.USERNAME.INVALID_MESSAGE),
    name: z.string().min(1, AUTH_VALIDATION.NAME.REQUIRED_MESSAGE),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, AUTH_VALIDATION.PASSWORD.MIN_MESSAGE)
      .regex(PASSWORD_PATTERN, AUTH_VALIDATION.PASSWORD.PATTERN_MESSAGE),
    confirmPassword: z
      .string()
      .min(1, AUTH_VALIDATION.PASSWORD_CONFIRMATION.REQUIRED_MESSAGE),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_VALIDATION.PASSWORD_CONFIRMATION.MISMATCH_MESSAGE,
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, AUTH_VALIDATION.USERNAME.REQUIRED_MESSAGE)
    .email(AUTH_VALIDATION.USERNAME.INVALID_MESSAGE),

  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, AUTH_VALIDATION.PASSWORD.MIN_MESSAGE),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = Pick<AuthResponse, "accessToken">;

export type GoogleTokenResponse = {
  id_token: string;
};

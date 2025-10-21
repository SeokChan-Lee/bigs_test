import { z } from "zod";

export const boardSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다."),
  content: z.string().min(1, "내용은 필수입니다."),
  category: z
    .enum(["NOTICE", "FREE", "QNA", "ETC"])
    .refine((val) => ["NOTICE", "FREE", "QNA", "ETC"].includes(val), {
      message: "카테고리를 선택해주세요.",
    }),
  file: z.instanceof(File).optional().nullable(),
});

export type BoardFormType = z.infer<typeof boardSchema>;

export type CreateBoardRequest = {
  title: string;
  content: string;
  category: string;
  file?: File | null;
};

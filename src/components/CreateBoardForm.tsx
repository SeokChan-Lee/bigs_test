"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardSchema, type BoardFormType } from "@/apis/boards/boards.type";
import { createBoard } from "@/apis/boards/boards.service";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import Link from "next/link";

export default function CreateBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<BoardFormType>({
    resolver: zodResolver(boardSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BoardFormType) => {
    try {
      await createBoard(data);
      alert("게시물이 등록되었습니다.");
      window.location.href = "/boards";
    } catch (error) {
      console.error("게시물 등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-2xl mx-auto pt-30 px-5 md:px-3 mb-30"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold ">게시글 작성</h1>
        <Link href="/boards">
          <Button className="px-2">뒤로가기</Button>
        </Link>
      </div>

      <Input
        {...register("title")}
        type="text"
        placeholder="제목을 입력하세요"
        label="제목"
        error={errors.title?.message}
      />

      <div className="flex flex-col">
        <label className="text-blue-900 mb-2">내용</label>
        <textarea
          {...register("content")}
          placeholder="내용을 입력하세요"
          className="bg-blue-200 rounded-[12px] text-black outline-black-600 h-[150px] w-full p-4 text-lg placeholder:text-blue-400"
        />
        {errors.content && (
          <span className="text-red text-sm mt-2 ml-2">
            {errors.content.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-blue-900 mb-2">카테고리</label>
        <select
          {...register("category")}
          className="bg-blue-200 rounded-[12px] text-black outline-black-600 h-[44px] w-full px-4 text-lg"
          defaultValue=""
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          <option value="NOTICE">공지사항</option>
          <option value="FREE">자유</option>
          <option value="QNA">Q&A</option>
          <option value="ETC">기타</option>
        </select>
        {errors.category && (
          <span className="text-red text-sm mt-2 ml-2">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-blue-900 mb-2">파일 업로드 (선택)</label>
        <input
          className="border border-gray-600 text-black w-100 p-2 rounded-[12px] hover:cursor-pointer"
          type="file"
          onChange={(e) => setValue("file", e.target.files?.[0] ?? null)}
        />
      </div>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? <Spinner /> : "게시물 등록"}
      </Button>
    </form>
  );
}

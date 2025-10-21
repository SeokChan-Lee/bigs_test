"use client";

import { useEffect, useState } from "react";
import { getBoardDetail, deleteBoard } from "@/apis/boards/boards.service";
import Image from "next/image";
import type { BoardDetail } from "@/apis/boards/boards.service";
import Spinner from "./Spinner";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BoardDetailProps {
  id: string;
}

export default function BoardDetail({ id }: BoardDetailProps) {
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getBoardDetail(Number(id));
        setBoard(data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchBoard();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteBoard(Number(id));
      router.push("/boards");
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  if (!board) return <Spinner />;

  const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const imageUrl =
    board.imageUrl &&
    (board.imageUrl.startsWith("http") || board.imageUrl.startsWith("https"))
      ? board.imageUrl
      : board.imageUrl
        ? `${BASE.replace(/\/$/, "")}${board.imageUrl}`
        : "";

  return (
    <div className="max-w-3xl mx-auto pt-30 px-5 md:px-3 mb-30">
      <div className="border-b-2 border-b-gray-400 pb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">제목 : {board.title}</h1>
          <div className="w-30">
            <Link href="/boards">
              <Button>뒤로가기</Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-500 mb-2">
            {board.boardCategory === "NOTICE"
              ? "공지"
              : board.boardCategory === "FREE"
                ? "자유"
                : board.boardCategory === "QNA"
                  ? "Q&A"
                  : board.boardCategory === "ETC"
                    ? "기타"
                    : board.boardCategory}{" "}
            | {new Date(board.createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-3">
            <Link href={`/boards/${id}/edit`}>
              <p className="hover:underline hover:cursor-pointer">수정</p>
            </Link>
            <button
              className="text-red-600 hover:underline hover:cursor-pointer"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={board.title}
            className="w-full h-auto rounded mb-6 "
            width={800}
            height={400}
            unoptimized={false}
          />
        ) : null}

        <p className="text-lg whitespace-pre-wrap ">{board.content}</p>
      </div>
    </div>
  );
}

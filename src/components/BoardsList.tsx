"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import { getBoards } from "@/apis/boards/boards.service";

type Board = {
  id: number;
  title: string;
  category: string;
  createdAt: string;
};

export default function BoardsList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBoards = async (page: number) => {
    try {
      setLoading(true);
      const data = await getBoards(page - 1, 10);
      setBoards(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);

  if (loading) return <Spinner />;

  return (
    <main className="mx-auto max-w-3xl pt-30 px-5 md:px-3 mb-30">
      <div className="flex justify-between items-center">
        <h1 className="text-black text-3xl font-bold">게시판 목록</h1>
        <div className="w-30">
          <Link href="/boards/create">
            <Button>게시글 작성</Button>
          </Link>
        </div>
      </div>

      <ul className="space-y-4 mt-10">
        {boards.map((board) => (
          <li
            key={board.id}
            className="border p-4 rounded-[12px] hover:scale-105 transition-transform duration-200"
          >
            <Link href={`/boards/${board.id}`}>
              <div className="text-sm text-gray-500">
                {" "}
                {board.category === "NOTICE"
                  ? "공지"
                  : board.category === "FREE"
                    ? "자유"
                    : board.category === "QNA"
                      ? "Q&A"
                      : board.category === "ETC"
                        ? "기타"
                        : board.category}
              </div>
              <div className="text-lg font-semibold">{board.title}</div>
              <div className="text-xs text-gray-400">
                {new Date(board.createdAt).toLocaleString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}

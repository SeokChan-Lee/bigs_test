import axiosInstance from "@/utils/axios";
import { CreateBoardRequest } from "./boards.type";

type Board = {
  id: number;
  title: string;
  category: string;
  createdAt: string;
};

export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

export type BoardDetail = {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl: string;
  createdAt: string;
};

type BoardListResponse = {
  content: Board[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export const getBoards = async (
  page: number = 0,
  size: number = 10
): Promise<BoardListResponse> => {
  const response = await axiosInstance.get<BoardListResponse>(
    `/boards?page=${page}&size=${size}`
  );
  return response.data;
};

export const getBoardDetail = async (id: number): Promise<BoardDetail> => {
  const response = await axiosInstance.get<BoardDetail>(`/boards/${id}`);
  return response.data;
};

export const createBoard = async (data: CreateBoardRequest) => {
  const formData = new FormData();

  const requestPayload = {
    title: data.title,
    content: data.content,
    category: data.category,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
  );

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await axiosInstance.post("/boards", formData);
  return response.data;
};

export const deleteBoard = async (id: number) => {
  const response = await axiosInstance.delete(`/boards/${id}`);
  return response.data;
};

export const updateBoard = async (id: number, data: CreateBoardRequest) => {
  const formData = new FormData();

  const requestPayload = {
    title: data.title,
    content: data.content,
    category: data.category,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
  );

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await axiosInstance.patch(`/boards/${id}`, formData);
  return response.data;
};

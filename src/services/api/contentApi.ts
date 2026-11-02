
import { axiosInstance } from "./axios";
import type { Content } from "../../data/content";

type ContentPayload = Omit<Content, "id">;

export const getContents = async (): Promise<Content[]> => {
  const response = await axiosInstance.get<Content[]>("/contents");

  return response.data;
};

export const createContent = async (
  payload: ContentPayload
): Promise<Content> => {
  const response = await axiosInstance.post<Content>(
    "/contents",
    payload
  );

  return response.data;
};

export const updateContent = async (
  id: string,
  payload: Partial<ContentPayload>
): Promise<Content> => {
  const response = await axiosInstance.put<Content>(
    `/contents/${id}`,
    payload
  );

  return response.data;
};

export const deleteContent = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(`/contents/${id}`);
};


import { axiosInstance } from "./axios";
import type { Content } from "../../types/content";

type ContentPayload = Omit<Content, "id">;

export const getContentsApi = async (): Promise<Content[]> => {
  const response = await axiosInstance.get<Content[]>("/contents");

  return response.data;
};

export const createContentApi = async (
  payload: ContentPayload
): Promise<Content> => {
  const response = await axiosInstance.post<Content>(
    "/contents",
    payload
  );

  return response.data;
};

export const updateContentApi = async (
  id: string,
  payload: Partial<ContentPayload>
): Promise<Content> => {
  const response = await axiosInstance.put<Content>(
    `/contents/${id}`,
    payload
  );

  return response.data;
};

export const deleteContentApi = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(`/contents/${id}`);
};

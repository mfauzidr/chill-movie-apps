import { Content } from "../types/content";

export const isObjectUrl = (value: string | undefined) =>
  value?.startsWith("blob:") ?? false;

export const revokeObjectUrl = (value: string | undefined) => {
  if (value && isObjectUrl(value)) URL.revokeObjectURL(value);
};

export const normalizeContent = <T extends Omit<Content, "id">>(content: T): T => {
  const normalized = { ...content };

  if (normalized.type === "film") {
    delete normalized.totalEpisodes;
    delete normalized.seasons;
    delete normalized.episodeDuration;
  } else {
    delete normalized.duration;
  }

  return normalized;
};
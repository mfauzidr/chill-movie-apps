import { useEffect } from "react";
import { useContentStore } from "../stores/zustand/contentStore";

export const useContents = () => {
  const fetchContents = useContentStore((state) => state.fetchContents);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { retry: fetchContents };
};
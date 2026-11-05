import { useEffect } from "react";
import { useContentStore } from "../stores/contentStore";

export const useContents = () => {
  const fetchContents = useContentStore((state) => state.fetchContents);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { retry: fetchContents };
};
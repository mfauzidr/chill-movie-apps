import { useEffect } from "react";
import {
  fetchContents,
  addContent,
  updateContent,
  deleteContent,
} from "../stores/redux/slices/contentSlice";
import { useAppDispatch, useAppSelector } from "../stores/redux/hooks";
import type { Content } from "../types/content";

export const useContents = () => {
  const dispatch = useAppDispatch();

  const hasFetched = useAppSelector((state) => state.content.hasFetched);

  const contents = useAppSelector((state) => state.content.contents);

  const isFetching = useAppSelector((state) => state.content.isFetching);

  const isCreating = useAppSelector((state) => state.content.isCreating);

  const isUpdating = useAppSelector((state) => state.content.isUpdating);

  const isDeleting = useAppSelector((state) => state.content.isDeleting);

  const error = useAppSelector((state) => state.content.error);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchContents());
    }
  }, [dispatch, hasFetched]);

  const retry = () => dispatch(fetchContents());

  const create = (payload: Omit<Content, "id">) =>
    dispatch(addContent(payload)).unwrap();

  const update = (id: string, updates: Omit<Content, "id">) =>
    dispatch(updateContent({ id, updates })).unwrap();

  const remove = (id: string) => dispatch(deleteContent({ id })).unwrap();

  return {
    contents,
    isFetching,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    retry,
    create,
    update,
    remove,
  };
};

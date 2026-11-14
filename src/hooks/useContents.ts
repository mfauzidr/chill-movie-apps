
import { useEffect } from "react";
import {
  fetchContents,
  addContent,
} from "../stores/redux/slices/contentSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../stores/redux/hooks";
import type { Content } from "../types/content";

export const useContents = () => {
  const dispatch = useAppDispatch();

  const hasFetched = useAppSelector(
    (state) => state.content.hasFetched
  );

  const contents = useAppSelector(
    (state) => state.content.contents
  );

  const isCreating = useAppSelector(
    (state) => state.content.isCreating
  );

  const error = useAppSelector(
    (state) => state.content.error
  );

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchContents());
    }
  }, [dispatch, hasFetched]);

  const retry = () => dispatch(fetchContents());

  const create = (payload: Omit<Content, "id">) =>
    dispatch(addContent(payload)).unwrap();

  return {
    contents,
    isCreating,
    error,
    retry,
    create,
  };
};

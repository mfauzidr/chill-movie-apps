import { useEffect } from "react";
import { fetchContents } from "../stores/redux/slices/contentSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../stores/redux/hooks";

export const useContents = () => {
  const dispatch = useAppDispatch();
  
  const hasFetched = useAppSelector(
    (state) => state.content.hasFetched
  );

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchContents());
    }
  }, [dispatch, hasFetched]);

  return {
    retry: () => dispatch(fetchContents()),
  };
};

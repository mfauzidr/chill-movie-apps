import type { Dispatch, SetStateAction } from "react";
import type { Content } from "../data/content";

export interface ContentContextType {
  contents: Content[];
  setContents: Dispatch<SetStateAction<Content[]>>;
}
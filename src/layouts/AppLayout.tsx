import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { contents as initialContents } from "../data/content";
import { createAppRoutes } from "../routes/router";

const AppLayout = () => {
  const [contents, setContents] = useState(initialContents);

  const routes = useRoutes(
    createAppRoutes(contents, setContents),
  );

  return routes;
};

export default AppLayout;
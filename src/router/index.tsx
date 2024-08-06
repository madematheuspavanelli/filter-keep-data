import { IndexPage } from "@/pages/index";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
]);

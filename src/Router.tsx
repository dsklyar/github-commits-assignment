import { createBrowserRouter } from "react-router-dom";
import { HomePage, CommitsPage, NotFoundPage } from "pages";
import ErrorPage from "pages/ErrorPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:owner/:repository",
    element: <CommitsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);

export default Router;

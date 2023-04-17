import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import TheAnime from "./Routes/TheAnime";
import Home from "./Routes/Home";
import Error404 from "./Routes/Error404";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error404 />,
    },
    { path: "/theAnime", element: <TheAnime /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider, Router } from "react-router-dom"

import TheAnime from "./Routes/TheAnime"
import Home from "./Routes/Home"
import Error404 from "./Routes/Error404"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/theAnime',
      element: <TheAnime />
    }
  ])

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App

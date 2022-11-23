import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import TheAnime from "./components/TheAnime"
import Home from "./components/Home"
import Error404 from "./components/Error404"

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/theAnime' element={ <TheAnime /> } />
            <Route path="*" element={ <Error404 /> } />
          </Routes>
        </Router>
    </>
  )
}

export default App

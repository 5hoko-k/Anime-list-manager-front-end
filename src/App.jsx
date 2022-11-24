import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import TheAnime from "./Routes/TheAnime"
import Home from "./Routes/Home"
import Error404 from "./Routes/Error404"

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

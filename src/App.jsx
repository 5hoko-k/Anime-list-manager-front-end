import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import TheAnime from "./components/TheAnime"
import Home from "./components/Home"

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/theAnime' element={ <TheAnime /> } />
          </Routes>
        </Router>
    </>
  )
}

export default App

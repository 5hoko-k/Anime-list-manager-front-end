import SearchBar from "./components/SearchBar"

import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import TheAnime from "./components/TheAnime"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <SearchBar /> } />
          <Route path='/theAnime' element={ <TheAnime /> } />
        </Routes>
      </Router>

    </>
  )
}

export default App

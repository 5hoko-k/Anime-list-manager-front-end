import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLibrary } from "../components/FetchLibrary"
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button'
import Footer from "../components/Footer";
import AnimeLibray from "../components/AnimeLibrary";
import ErrorPage from "../components/ErrorPage";
import SearchResults from "../components/SearchResults";
import Search from "../components/Search";

function Home() {
  const [showLibrary, setShowLibrary] = useState(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [animeData, setAnime] = useState([]);
  const [showProgress, setShowProgress] = useState(false)
  const [showError, setShowError] = useState(false)

  let animeLibraryProps = null;



  const { fetchUserLibrary } = FetchLibrary();

  const navigate = useNavigate();

  const goToAnime = (e) => {
    let animeId = e.target.id;
    let anime = animeData.library
    anime.map((anime) => {
      if (anime.data.id === animeId) {
        navigate("/theAnime", {
          state: {
            anime: anime,
          },
        });
      }
    });
  };

  const fetchLibraryData = async () => {
    const data = await fetchUserLibrary();

    if(data.message == 'Failed to fetch'){
      setShowProgress(false)
      setShowLibrary(false)
      setShowSearchResult(false)
      setShowError(true)
    }else{
      setShowProgress(false)
      console.log(data)
      animeLibraryProps = {"library":data}
      setAnime(animeLibraryProps);
      setShowLibrary(true)
      setShowSearchResult(false)
    }
    
  };

  useEffect(() => {
    fetchLibraryData();
    setTimeout(function () {
      setShowProgress(true)
    }, 1000)
    setShowLibrary(true)
  }, []);

  return (
    <>
    <div className="relative flex flex-col min-h-screen">
      <div className='fixed top-0 left-0 right-0'>
        {showProgress && <LinearProgress color="success" />}
      </div>

      <div className="mx-auto w-3/4 mt-36 h-full">

        <Search libraryTrigger={setShowLibrary} searchResultTrigger={setShowSearchResult} errorTrigger={setShowError} setAnimeList={setAnime}/>

        <div className="flex mx-auto h-full p-5 bg-bushGreen-shades-500 border border-green-600">
          {showLibrary && <AnimeLibray props={animeData} goToAnime={goToAnime} />}

          { showSearchResult && <SearchResults theAnimes={animeData} />}

          {showError && <ErrorPage />}
        </div>
      </div>
      <Footer />

    </div>
          </>
  );
}

export default Home;

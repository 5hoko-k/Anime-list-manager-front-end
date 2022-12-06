import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLibrary } from "../components/FetchLibrary"
import LinearProgress from '@mui/material/LinearProgress';
import Footer from "../components/Footer";
import ErrorPage from "../components/ErrorPage";
import Search from "../components/Search";
import ListDisplay from "../components/ListDisplay";

function Home() {
  const [animeData, setAnime] = useState([]);
  const [showProgress, setShowProgress] = useState(false)
  const [showError, setShowError] = useState(false)

  const { fetchUserLibrary } = FetchLibrary();

  const fetchLibraryData = async () => {
    const url = import.meta.env.VITE_WEB_URL;
    const data = await fetchUserLibrary(url);

    if(data.message == 'Failed to fetch'){
      setShowProgress(false)
      setShowError(true)
    }else{
      setShowProgress(false)
      setAnime(data);
    }
    
  };

  useEffect(() => {
    fetchLibraryData();
    setTimeout(function () {
      setShowProgress(true)
    }, 1000)
  }, []);

  return (
    <>
    <div className="relative flex flex-col min-h-screen">
      <div className='fixed top-0 left-0 right-0'>
        {showProgress && <LinearProgress color="success" />}
      </div>

      <div className="mx-auto w-3/4 mt-36 h-full">

        <Search errorTrigger={setShowError} setAnimeList={setAnime} progressBarTrigger={setShowProgress}/>

        <div className="flex mx-auto h-full p-5 bg-bushGreen-shades-500 border border-green-600">

          <ListDisplay theAnimes={animeData} setAnimeList={setAnime} />

          {showError && <ErrorPage />}
        </div>
      </div>
      <Footer />

    </div>
          </>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Kitsu from "kitsu";
import { FetchLibrary } from "./FetchLibrary"
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button'
import Footer from "./Footer";
import AnimeLibray from "./AnimeLibrary";
import Search from "./Search";

function Home() {
  const [showLibrary, setShowLibrary] = useState(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [animeData, setAnime] = useState([]);
  const [showProgress, setShowProgress] = useState(false)

  let animeLibraryProps = null;
  let searchResultProps = null;


  const api = new Kitsu();
  const { fetchUserLibrary } = FetchLibrary();

  const navigate = useNavigate();

  const fetchData = () => {
    api.get("anime", {
        params: {
          filter: {
            text: searchText
           }
        },
      })
      .then((res) => {
        if (res.data){
          searchResultProps = {"searchResults": sortTheResult(res.data)}
          setAnime(searchResultProps);
          setShowLibrary(false)
          setShowSearchResult(true)
        }

      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    console.log("clicked");
  };

  const sortTheResult = (array) => {
    return array.sort(function (a, b) {
      return a.popularityRank - b.popularityRank;
    });
  };

  const goToAnime = (e) => {
    let animeId = e.target.id;

    animeData.map((anime) => {
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
    console.log("heres the data")
    console.log(data)
    if(data){
      setShowProgress(false)
    }
    animeLibraryProps = {"library":data}
    setAnime(animeLibraryProps);
    setShowLibrary(true)
    setShowSearchResult(false)
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
    <div className="flex flex-col min-h-screen">
      <div>
        {showProgress && <LinearProgress color="success" />}
      </div>

      <div className="mx-auto w-3/4 mt-36 h-full">
        <div className="flex flex-row justify-end items-center px-1 pt-10 pb-6 space-x-5">
          <input
            className="border-solid border-2 border-green-800 hover:border-green-900 p-1 rounded-md"
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant='contained' color='success' onClick={fetchData}> Search </Button>
        </div>

        <div className="flex mx-auto h-full p-5 bg-bushGreen-shades-500 border border-green-600">
          {showLibrary && <AnimeLibray props={animeData} goToAnime={goToAnime} />}

          { showSearchResult && <Search props={animeData} goToAnime={goToAnime} />}
        </div>
      </div>
      <Footer />

    </div>
          </>
  );
}

export default Home;

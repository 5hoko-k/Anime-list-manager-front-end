import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Kitsu from "kitsu";
import { FetchLibrary } from "./FetchLibrary"
import LinearProgress from '@mui/material/LinearProgress';

function SearchBar() {
  const [Title, setTitle] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [animeData, setAnime] = useState([]);
  // const [value, setValue] = useState()
  const [showProgress, setShowProgress] = useState(false)


  const api = new Kitsu();
  const { fetchUserLibrary } = FetchLibrary();

  const navigate = useNavigate();

  const fetchData = () => {
    api
      .get("anime", {
        params: {
          filter: {
            text: searchText,
          },
          sort: "popularityRank", // put leading dash (-) if you want to sort in descending order like -popularityRank
        },
      })
      .then((res) => {
        console.log(res.data);
        setTitle(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    console.log("clicked");
  };

  // const setProgressbarValue = (payload) => {
  //   const { recieved, streamLength, loading } = payload;
  //   const value = Math.round(((recieved / streamLength) * 100));

    // if(loading){
    //   setValue(value)
    // }else{
    //   setValue(null)
    // }
    // };

  // window.addEventListener('fetch-progress', (e) => {
  //   setProgressbarValue(e.detail);
  // });
  
  // window.addEventListener('fetch-finished', (e) => {
  //   setProgressbarValue(e.detail);
  // });

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
    // console.log(Title.anime)
  };

  const fetchLibraryData = async () => {
    const data = await fetchUserLibrary();
    console.log("heres the data")
    console.log(data)
    if(data){
      setShowProgress(false)
    }
    setAnime(data);
  };

  useEffect(() => {
    fetchLibraryData();
    setTimeout(function () {
      setShowProgress(true)
    }, 1000)
  }, []);

  return (
    <>
      <div>
      {/* {showProgress && value!=100 && <LinearProgress color="success" />} */}
      {showProgress && <LinearProgress color="success" />}
      </div>

      <div className="mx-auto w-3/4 mt-36 h-full">
        <div className="flex flex-col justify-center items-center px-14 pt-10 pb-10 space-y-5">
          <input
            className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full"
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-full md:w-1/4 text-white"
            type="button"
            onClick={fetchData}
          >
            {" "}
            Search{" "}
          </button>
        </div>

        <div className="flex mx-auto h-full p-5 bg-bushGreen-shades-500">
          {animeData.length > 0 && (
            <div className="flex flex-wrap justify-start">
              {animeData.map((anime) => (
                <div
                  key={anime.data.id}
                  id={anime.data.id}
                  className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-gray-200 text-xs"
                  onClick={goToAnime}
                >
                  <img
                    id={anime.data.id}
                    className=""
                    src={anime.data.attributes.posterImage.small}
                    onClick={goToAnime}
                  />
                  <div className="px-2">
                    <div>
                      <label>Eng Title: </label>
                      <p
                        id={anime.data.id}
                        onClick={goToAnime}
                      >
                        {anime.data.attributes.titles.en}
                      </p>
                    </div>
                    <div>
                      <label>Jap Title: </label>
                      <p
                        id={anime.data.id}
                        onClick={goToAnime}
                      >
                        {anime.data.attributes.titles.en_jp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;

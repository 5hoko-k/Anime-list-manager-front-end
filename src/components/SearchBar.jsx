import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Kitsu from "kitsu";
import { FetchLibrary } from "./FetchLibrary"
import { Progress } from "@material-tailwind/react";

function SearchBar() {
  const [Title, setTitle] = useState([]);
  const [text, setText] = useState();
  const [animeData, setAnime] = useState([]);
  const [value, setValue] = useState()

  const [style, setStyle] = useState({
    width: `${value}`
  })

  const api = new Kitsu();
  const { progress } = FetchLibrary()

  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setText(e.target.value);
  };

  const fetchData = () => {
    api
      .get("anime", {
        params: {
          filter: {
            text: text,
          },
        },
      })
      .then((res) => {
        console.log(res.data);
        setTitle(sortTheResult(res.data));
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    console.log("clicked");
  };

  const setProgressbarValue = (payload) => {
    const { recieved, streamLength, loading } = payload;
    const value = ((recieved / streamLength) * 100).toFixed(2);

    setValue(value)

  };

  window.addEventListener('fetch-progress', (e) => {
    setProgressbarValue(e.detail);
  });
  
  window.addEventListener('fetch-finished', (e) => {
    setProgressbarValue(e.detail);
  });

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
    const data = await progress();
    console.log("heres the data")
    console.log(data)
    setAnime(data);
  }

  useEffect(() => {
      fetchLibraryData()
  }, []);

  return (
    <>
      <div>
        {progressViewControl() && <Progress value={value} color="green" />}
      </div>
      <div className="mx-auto w-3/4 mt-36 h-full">
        <div className="flex flex-col justify-center items-center px-14 pt-10 pb-10 space-y-5">
          <input
            className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full"
            type="search"
            placeholder="Search"
            onChange={handleSearchInput}
          />

          <button
            className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white"
            type="button"
            onClick={fetchData}
          >
            {" "}
            Search{" "}
          </button>
        </div>

        <div className="text-slate-200">
          <h1>{value}</h1>
        </div>

        <div className="flex mx-auto h-full p-5 bg-bushGreen-shades-500">
          {animeData.length > 0 && (
            <div className="flex flex-wrap justify-start">
              {animeData.map((anime) => (
                <div
                  key={anime.data.id}
                  id={anime.data.id}
                  className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-slate-200"
                  onClick={goToAnime}
                >
                  <img
                    id={anime.data.id}
                    className=""
                    src={anime.data.attributes.posterImage.original}
                    onClick={goToAnime}
                  />
                  <div className="px-2">
                    <div>
                      <label>English Title: </label>
                      <p
                        id={anime.data.id}
                        className="text-sm"
                        onClick={goToAnime}
                      >
                        {anime.data.attributes.titles.en}
                      </p>
                    </div>
                    <div>
                      <label>Japanese Title: </label>
                      <p
                        id={anime.data.id}
                        className="text-sm"
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

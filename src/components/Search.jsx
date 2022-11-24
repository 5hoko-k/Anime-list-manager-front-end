import { useState } from "react";
import Kitsu from "kitsu";
import Button from '@mui/material/Button'

function Search(props) {
    let setShowLibrary = props.libraryTrigger
    let setShowSearchResult = props.searchResultTrigger
    let setShowError = props.errorTrigger
    let setAnime = props.setAnimeList
    let searchResultProps = null;

    const [searchText, setSearchText] = useState("");
    const api = new Kitsu();

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
              setShowError(false)
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

    return(
        <>
            <div className="flex flex-row justify-end items-center px-1 pt-10 pb-6 space-x-5">
                <input
                    className="border-solid border-2 border-green-800 hover:border-green-900 p-1 rounded-md"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant='contained' color='success' onClick={fetchData}> Search </Button>
                </div>
        </>
    )
}

export default Search;
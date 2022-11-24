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
    let results = null;

    const fetchData = async () => {
        const url = "http://localhost:8000/search/"+ searchText

        try{
          const res = await fetch(url)

          if(res.status>=200 && res.status<=300){
              try{
                results = await res.json();
                console.log(results)

                searchResultProps = {"searchResults": sortTheResult(results)}
                setAnime(searchResultProps);
                setShowLibrary(false)
                setShowError(false)
                setShowSearchResult(true)
              }catch(err){
                console.log(err)
              }
              return results;
          }else{
              console.log(res)
              throw new Error(res.statusText)
          }
      }catch(err){

        return err
      }
    
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
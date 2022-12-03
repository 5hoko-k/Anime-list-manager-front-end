import { useState } from "react";
import Kitsu from "kitsu";
import Button from '@mui/material/Button'

function Search(props) {
    let setShowLibrary = props.libraryTrigger
    let setShowSearchResult = props.searchResultTrigger
    let setShowError = props.errorTrigger
    let setAnime = props.setAnimeList
    let setShowProgress = props.progressBarTrigger
    let searchResultProps = null;

    const [searchText, setSearchText] = useState("");
    const api = new Kitsu();
    let results = null;

    const clearInputField = () => {
      document.getElementById("search").value = ""
    }

    const fetchData = async () => {
        const url = import.meta.env.VITE_LOCAL_URL + searchText

        setShowProgress(true)

        try{
          const res = await fetch(url)

          if(res.status>=200 && res.status<=300){
              try{
                results = await res.json();

                searchResultProps = {"searchResults": sortTheResult(results)}
                setAnime(searchResultProps);
                setShowLibrary(false)
                setShowError(false)
                setShowSearchResult(true)
                setShowProgress(false)
              }catch(err){
                console.log(err)
                setShowProgress(false)
              }
              clearInputField()
              return results;
          }else{
              console.log(res)
              setShowProgress(false)
              throw new Error(res.statusText)
          }
      }catch(err){

        return err
      }
    
      };

      const keyListener = (e) => {
        if(e.key === 'Enter'){
          fetchData()
        }
      }

      const sortTheResult = (array) => {
        return array.sort(function (a, b) {
          return a.popularityRank - b.popularityRank;
        });
      };

    return(
        <>
            <div className="flex flex-row justify-end items-center px-1 pt-10 pb-6 space-x-5">
                <input id="search"
                    className="border-solid border-2 border-green-800 hover:border-green-900 p-1 rounded-md"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)} onKeyDown={keyListener}
                />
                <Button variant='contained' color='success' onClick={fetchData}> Search </Button>
                </div>
        </>
    )
}

export default Search;
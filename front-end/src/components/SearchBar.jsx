import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlgoliaSearch from './AlgoliaSearch'
import Kitsu from 'kitsu'

function SearchBar(){

    const [Title, setTitle] = useState([])
    const [text, setText] = useState()
    const api = new Kitsu()

    const navigate = useNavigate()

    const handleSearchInput = e => {
        setText(e.target.value)
    }

    const fetchData = () => {

        api.get('anime', { 
                            params: { 
                                filter: { 
                                    text: text 
                                }
                            } 
                        }
                )
        .then(res => { 
            console.log(res.data)
            setTitle(sortTheResult(res.data))
            console.log(res.status)
         })
         .catch(err => {
            console.log(err)
            alert(err.message)
         })

        console.log("clicked")
    }

    const sortTheResult = array => {
        return array.sort(function (a, b) {
            return a.popularityRank - b.popularityRank
        })
    }

    const goToAnime = e => {

        let animeId = e.target.id

        Title.map((anime) => {
            if(anime.id === animeId){
                navigate("/theAnime", {
                    state: {
                        "anime": anime
                    }
                })
            }
        })
        // console.log(Title.anime)
    }

    return(
        <>
        <div>
            <div className="flex flex-col justify-center items-center px-14 pt-20 pb-10 space-y-5">

                <input className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full" type='search' placeholder="Search" onChange={ handleSearchInput }/>

                <button className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white" type="button" onClick={ fetchData }> Search </button>

            </div>

            <div className="flex mx-auto w-3/4 h-full p-5 bg-green-700">
                
                    { Title.length > 0 && (
                        <div className="flex flex-wrap justify-start">
                            { Title.map(anime => (
                                <div key={anime.id} id={anime.id} className="p-1 border-2 border-green-700 bg-green-900 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" onClick={ goToAnime }>
                                    <img id={anime.id} className="" src= { anime.posterImage.original } onClick={ goToAnime }/>
                                    <div>
                                        <label>English Title: </label>
                                        <p id={anime.id} className="text-sm" onClick={ goToAnime }>{ anime.titles.en }</p>
                                    </div>
                                    <div>
                                        <label>Japanese Title: </label>
                                        <p id={anime.id} className="text-sm" onClick={ goToAnime }>{ anime.titles.en_jp }</p>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    )}   
            </div>
            </div>
        </>
    )
}

export default SearchBar
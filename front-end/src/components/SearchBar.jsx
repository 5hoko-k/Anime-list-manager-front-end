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
            console.log(res.data.id)
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
            <div className="flex flex-col justify-center items-center p-5 space-y-5">

                <input className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full" type='search' placeholder="Search" onChange={ handleSearchInput }/>

                <button className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white" type="button" onClick={ fetchData }> Search </button>

                <AlgoliaSearch />

            </div>
            <div>
                <div>
                    { Title.length > 0 && (
                        <div className="flex flex-wrap justify-evenly space-x-2 space-y-2">
                            { Title.map(anime => (
                                <div key={anime.id} id={anime.id} className="p-2 border-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5" onClick={ goToAnime }>
                                    <img id={anime.id} className="" src= { anime.posterImage.original } onClick={ goToAnime }/>
                                    <p id={anime.id} onClick={ goToAnime }>{ anime.titles.en }</p>
                                    <p id={anime.id} onClick={ goToAnime }>{ anime.titles.en_jp }</p>
                                    { console.log(anime) }
                                </div>
                                ))
                            }
                        </div>
                    )}   
                </div>
                { Title.length }
                { text }
            </div>
        </>
    )
}

export default SearchBar
import { useState } from 'react'
import AlgoliaSearch from './AlgoliaSearch'
import Kitsu from 'kitsu'

function SearchBar(){

    const [Title, setTitle] = useState([])
    const [text, setText] = useState()
    const api = new Kitsu()

    const handleSearchInput = e => {
        setText(e.target.value)
    }

    const fetchData = () => {
        // fetch(`https://kitsu.io/api/edge/anime?fields%5Battributes%5D=titles`, {
        //     Headers: { 'Accept': 'application/vnd.api+json',
        //     'Context-type': 'application/vnd.api+json'}
        //     })
        // .then(res => {
        //     return res.json()
        // })
        // .then(data => {
        //     console.log(data)
        //     setTitle(data.data)
        //     console.log(typeof(Title))
        //     console.log(data.data)
        // })

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

    return(
        <>
            <div className="flex flex-col justify-center items-center p-5 space-y-5">

                <input className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full" type='search' placeholder="Search" onChange={ handleSearchInput }/>

                <button className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white" type="button" onClick={ fetchData }> Search </button>

                <AlgoliaSearch />

            </div>
            <div>
                <div>
                    {Title.length > 0 && 
                        <ul>
                            {
                                Title.map(anime => (
                                    <li key={ anime.id }>{ anime.popularityRank }</li>
                                ))
                            }
                        </ul>
                    }
                </div>
                <div>
                    { Title.length > 0 && (
                        <div className="flex flex-wrap justify-evenly space-x-2 space-y-2">
                            { Title.map(anime => (
                                <div key={anime.id} className="p-2 border-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                                    <img className="" src= { anime.posterImage.original } />
                                    <p>{ anime.titles.en }</p>
                                    <p>{ anime.titles.en_jp }</p>
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
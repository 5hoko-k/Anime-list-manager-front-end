import { useState, useEffect } from 'react'

function SearchBar(){

    const [Title, setTitle] = useState([])
    const [text, setText] = useState()

    const handleSearchInput = e => {
        setText(e.target.value)
    }

    const fetchData = () => {
        fetch(`https://kitsu.io/api/edge/anime?filter%5Btext%5D= ${ text }`, {
            Headers: { 'Accept': 'application/vnd.api+json',
            'Context-type': 'application/vnd.api+json'}
            })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setTitle(data.data)
            console.log(typeof(Title))
            console.log(data.data)
        })

        console.log("clicked")
    }

    // useEffect(() => { 

    //     const fetchData = () => {

    //     }

    //     setTitle(fetchData())
    // },[])

    return(
        <>
            <div className="flex flex-col justify-center items-center p-5 space-y-5">

                <input className="border-solid border-2 border-green-800 hover:border-green-600 p-2 rounded-md w-full" type='search' placeholder="Search" onChange={ handleSearchInput }/>

                <button className="bg-green-700 hover:bg-green-600 rounded-md p-2 w-1/4 text-white" type="button" onClick={ fetchData }> Search </button>

            </div>
            <div>
                <div>
                    { Title.length > 0 && (
                        <ul>
                            { Title.map(anime => (
                                <li key={anime.id}>
                                    { anime.attributes.abbreviatedTitles }
                                </li>
                            ))}
                        </ul>
                    )}   
                </div>
                { Title.length }
                { text }
            </div>
        </>
    )
}

export default SearchBar
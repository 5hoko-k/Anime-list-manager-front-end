import { useLocation } from "react-router-dom";
import { useState } from 'react'

function TheAnime() {

    const { state } = useLocation()
    const { anime } = state

    const [characters, setCharacters] = useState()

    const showCharacters = () => {
        console.log(anime.animeCharacters)

        fetch(anime.animeCharacters.links.self)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res.data)
            
        })

        console.log("clicked")
    }

    return (
        <>
            <div className="bg-green-900">
                <div className="bg-green-600 min-h">
                    <img src={ anime.coverImage.large } />
                </div>
                <div className="flex mx-auto w-3/4 h-full">
                    <aside className="bg-green-800 p-3 w-1/3">
                        <div className=" bg-green-800 p-1 rounded-lg shadow-lg">
                            <img className="rounded-lg shadow-lg w-full" src= { anime.posterImage.small }/>
                            <p>{ anime.titles.en }</p>
                            <p>{ anime.titles.en_jp }</p>
                            <p>{ console.log(anime)}</p>
                        </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                    </aside>

                    <main className='bg-green-700 w-2/3'>
                        <div className="hover:bg-green-800">
                            <button className='hover:bg-green-900 p-2' onClick={showCharacters}>
                                Characters
                            </button>
                        </div>
                        <div className="p-3">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis architecto dicta impedit ex accusantium delectus? Vel nam minima provident corporis nisi, perferendis blanditiis eligendi rerum asperiores maiores veritatis dolorem aspernatur.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, tempora, delectus qui reiciendis obcaecati natus at aliquid provident nihil ipsa asperiores officia veniam? Tempore esse impedit architecto reprehenderit harum atque?</p>
                        </div>
                    </main>
                </div>
            </div>
        </>


    )
}

export default TheAnime;
import { useLocation } from "react-router-dom";

function TheAnime() {

    const { state } = useLocation()
    const { anime } = state

    return (
        <>
            <div className="my-52 ml-36">
                <img className="w-1/4" src= { anime.posterImage.original }/>
                <p>{ anime.titles.en }</p>
                <p>{ anime.titles.en_jp }</p>
            </div>
        </>


    )
}

export default TheAnime;
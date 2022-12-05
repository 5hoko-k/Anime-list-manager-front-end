import { useNavigate } from "react-router-dom";

function ListDisplay(props) {
    let animeData = props.theAnimes.animes;
    const navigate = useNavigate();

    const goToAnime = (e) => {
        let animeId = e.target.id;

        animeData.map((anime) => {
          if (anime.id === animeId) {
            navigate("/theAnime", {
              state: {
                anime: anime,
              },
            });
          }
        });
      };
      
    return (
        <>       
            {animeData && 
                <div className="flex flex-wrap justify-start h-full">
                    {animeData.map((anime) => (
                            <div
                            key={anime.id}
                            id={anime.id}
                            className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-gray-200 text-xs"
                            onClick={goToAnime}>
                                <img
                                    id={anime.id}
                                    className=""
                                    src={anime.attributes.posterImage.small}
                                    onClick={goToAnime}
                                />
                                <div className="px-2">
                                    <p id={anime.id} onClick={goToAnime}>
                                        {anime.attributes.titles.en}
                                    </p>      
                                    <p id={anime.id} onClick={goToAnime}>
                                        {anime.attributes.titles.en_jp}
                                    </p>
                                </div>
                        </div> ))}
                </div>
            }
        </>
    )
}

export default ListDisplay;
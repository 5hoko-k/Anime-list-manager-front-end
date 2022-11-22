function AnimeLibray({props, goToAnime}) {
    let animeData = props.library;

    return (
        <>  
            {animeData && 
            <div className="flex flex-wrap justify-start h-full">
              {animeData.map((anime) => (
                <div
                  key={anime.data.id}
                  id={anime.data.id}
                  className="p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-gray-200 text-xs"
                  onClick={goToAnime}
                >
                  <img
                    id={anime.data.id}
                    className=""
                    src={anime.data.attributes.posterImage.small}
                    onClick={goToAnime}
                  />
                  <div className="px-2">
                      <p id={anime.data.id} onClick={goToAnime}>
                        {anime.data.attributes.titles.en}
                      </p>
                      <p id={anime.data.id} onClick={goToAnime}>
                        {anime.data.attributes.titles.en_jp}
                      </p>
                  </div>
                </div>
              ))}
            </div>
            }
        </>
    )
}

export default AnimeLibray;
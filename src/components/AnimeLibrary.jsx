import Button from '@mui/material/Button'
// import { FetchLibrary } from "../components/FetchLibrary"

function AnimeLibray({props, goToAnime}) {
    let animeData = props.animes;
    let pageLinks = props.pageLinks;
    
    // const { fetchUserLibrary } = FetchLibrary();

    async function fetchPage(e) {
      // const res = await fetchUserLibrary()
      console.log(e.target.id)
    }

    return (
        <>  
            {animeData && 
            <div>
              <div>
              {pageLinks.first && <Button id='first' variant='contained' color='success' onClick={fetchPage}> First </Button>}
              {pageLinks.next && <Button id='next' variant='contained' color='success' onClick={fetchPage}> Next </Button>}
              {pageLinks.last && <Button id='last' variant='contained' color='success' onClick={fetchPage}> Last </Button>}
              </div>

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
            </div>
            }
        </>
    )
}

export default AnimeLibray;
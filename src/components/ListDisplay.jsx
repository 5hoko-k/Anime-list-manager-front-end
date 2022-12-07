import { useNavigate } from "react-router-dom";
import { FetchLibrary } from "../components/FetchLibrary"
import Button from '@mui/material/Button'

function ListDisplay(props) {
    let animeData = props.theAnimes.animes;
    let pageLinks = props.theAnimes.pageLinks;
    let setAnime = props.setAnimeList;

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

      const { fetchLibraryPage } = FetchLibrary();

      async function fetchPage(e) {
        let res = null;
        let url = import.meta.env.VITE_LOCAL_URL + "paging/"
        console.log(e.target.id)
  
        if(e.target.id === 'next'){
          res = await fetchLibraryPage(url, pageLinks.next)
        }else if(e.target.id === 'first'){
          res = await fetchLibraryPage(url, pageLinks.first)
        }else if(e.target.id === 'last'){
          res = await fetchLibraryPage(url, pageLinks.last)
        }
  
        console.log(res)
        console.log(res.pageLinks)
        setAnime({
          "animes": res.animes,
          "pageLinks": res.pageLinks})
        animeData = res.data

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
                </div>
            }
        </>
    )
}

export default ListDisplay;
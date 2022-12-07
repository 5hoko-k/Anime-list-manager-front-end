
export function FetchLibrary(){
    let results = null;

    async function fetchUserLibrary(url) {
        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = await res.json();
                return results;
            }else{
                throw new Error(res.statusText)
            }
        }catch(err){

          return err
        }
    }

    async function fetchLibraryPage(url, pageLinks) {
        try{
            const res = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "url": pageLinks })
              })

            if(res.status>=200 && res.status<=300){
                results = await res.json()
                return results;
            }else{
                throw new Error(res.statusText)
            }
        }catch(err){

          return err
        }
    }

    return { fetchUserLibrary, fetchLibraryPage }
}



export function FetchLibrary(){
    let results = null;

    async function fetchUserLibrary(url) {
        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = await res.json();
                console.log(results)
                return results;
            }else{
                console.log(res)
                throw new Error(res.statusText)
            }
        }catch(err){

          return err
        }
    }

    async function fetchLibraryPage(url) {
        try{
            const res = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "url": pageLinks.next })
              })

            if(res.status>=200 && res.status<=300){
                results = await response.json()
                console.log(results)
                return results;
            }else{
                console.log(res)
                throw new Error(res.statusText)
            }
        }catch(err){

          return err
        }
    }

    return { fetchUserLibrary, fetchLibraryPage }
}


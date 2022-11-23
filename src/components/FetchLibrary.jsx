
export function FetchLibrary(){
    let results = null;

    async function fetchUserLibrary() {
        // const url = "https://anime-manager-app.herokuapp.com/";
        // const url = "http://localhost:8000/";
        const url = "https://anime-list-manager-back-end-production.up.railway.app/"

        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = res.json();
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

    return { fetchUserLibrary }
}


export function FetchLibrary(){
    let loading = false;
    let results = null;

    async function progress() {
        loading = true;
        const url = "https://anime-manager-app.herokuapp.com/";
        // const url = "http://localhost:8000/";
        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = await res.json()
                return results;
            }else{
                console.log(res)
                throw new Error(res.statusText)
            }
        }catch(err){
          return err
        }finally{
            loading = false;
        }
    }

    return { progress }
}


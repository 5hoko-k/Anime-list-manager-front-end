
export function FetchLibrary(){
    let results = null;

    async function fetchUserLibrary() {
        const url = import.meta.env.WEB_URL;
i
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

    return { fetchUserLibrary }
}


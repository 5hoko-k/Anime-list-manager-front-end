function FetchLibrary(){
    let loading = false;
    let results = null;

    async function progress() {
        loading = true;
        try{
            const res = await fetch("http://localhost:8000/")

            if(res.status>200 && res.status<300){
                results = await res.json()
                return results;
            }else{
                throw new Error(res.statusText)
            }
        }catch(err){
          console.log(err)
          return err
        }finally{
            loading = false;
        }
    }

    return { progress }
}

export default FetchLibrary();
export function FetchLibrary(){
    let loading = false;
    let results = null;
    let chunks = [];

    async function progress() {
        loading = true;
        const url = "https://anime-manager-app.herokuapp.com/";
        // const url = "http://localhost:8000/";
        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = await readBody(res)
                console.log(results)
                console.log("yoooooooooo")
                return JSON.parse(results);
            }else{
                console.log(res)
                console.log("yeaaaaaaaaaaaaaaa")
                throw new Error(res.statusText)
            }
        }catch(err){
          return err
        }finally{
            loading = false;
        }
    }

    async function readBody(res) {
        const reader = res.body.getReader();
        console.log("kakashiiiiiiiiiiiiiiiii")
        while(loading){
            const {done, value} = await reader.read();
            if(done){
                loading = false;
            }else{
                chunks.push(value);
                console.log(chunks)
                console.log("hatakeeeeeeeeeeeeeee")
            }
        }
        const somn = new TextDecoder('utf-8').decode(chunks);
        console.log(somn)
        console.log("somn is printed by now")

        return somn;
    }

    return { progress }
}


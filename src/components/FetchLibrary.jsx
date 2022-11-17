import { useState } from "react"
export function FetchLibrary(){
    let loading = false;
    let results = null;
    let chunks = [];

    async function progress() {
        loading = true;
        // const url = "https://anime-manager-app.herokuapp.com/";
        // const url = "http://localhost:8000/";
        const url = "https://anime-list-manager-back-end-production.up.railway.app/"

        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                // results = await readBody(res)
                results = res.json();
                console.log(results)
                // return JSON.parse(results);
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

    // async function readBody(res) {
    //     const reader = res.body.getReader();
    //     const streamLength = +res.headers.get('content-length'); 
    //     console.log(streamLength)

    //     let recieved = 0;

    //     while(loading){
    //         const {done, value} = await reader.read();
    //         const payload = { detail: { recieved, streamLength, loading } }
    //         const onProgress = new CustomEvent('fetch-progress', payload);
    //         const onFinished = new CustomEvent('fetch-finished', payload)

    //         if(done){
    //             loading = false;

    //             // Fired when reading the response body finishes
    //             window.dispatchEvent(onFinished)
    //         }else{
    //             chunks.push(value);
    //             // console.log(chunks)
    //             console.log(chunks)
    //             recieved += value.length; 

    //             // Fired on each .read() - progress tick
    //             window.dispatchEvent(onProgress); 
    //         }
    //     }

    //     console.log("stage 1")
    //     let body = new Uint8Array(recieved);
    //     let position = 0;

    //     console.log("stage 2")
    //     for (let chunk of chunks) {
    //         body.set(chunk, position);
    //         position += chunk.length;
    //     }

    //     console.log("stage 3")
    //     return new TextDecoder().decode(body);
    // }

    return { progress }
}


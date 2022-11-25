
import Charts from "../../src/charts";
import {useEffect, useLayoutEffect, useState} from "react";

export default function Index() {

    const [token, setToken] = useState("")

    const CLIENT_ID = "e06a8e4468034056a35e699e61e7b0cb"
    const REDIRECT_URI = "http://localhost:3000"
    const scopes = 'user-top-read'



    useEffect(() => {

        console.log('render')
           const hash = window.location.hash
               .substring(1)
               .split("&")
               .reduce(function (initial, item) {
                   if (item) {
                       let parts = item.split("=");
                       initial[parts[0]] = decodeURIComponent(parts[1]);
                   }
                   return initial;
               }, {});
           setToken(hash.access_token)



    }, []);


    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);

    return (
        <>
            {token ? <div>

                <Charts token={token}/>

            </div> : <button> Login
                <a href={url}>LOGIN</a>
            </button>}

        </>
    );
}

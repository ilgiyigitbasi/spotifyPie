import React, {useEffect, useState} from 'react';
import axios from "axios";

const Charts = (props) => {


    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);


    useEffect(() => {

        window.location.hash= ''

        console.log(props.token !== '', 'bool')
        if (props.token !== '') {
            getTopArtists()
            getTopTracks()
        }

    }, []);

    function getTopArtists() {

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token
        }
        axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=30', {headers}).then((res) => {
            let arr = res.data.items.map((i) => i.name)
            setArtists(arr)
        })
    }
    function getTopTracks() {

        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token
        }
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=30', {headers}).then((res) => {

            let arr = []
            for (const element of res.data.items) {

                let artist = element.artists.length > 1 ? element.artists.map((i) => i.name).join(',') : element.artists[0].name
                let obj = {
                    artistsNames: artist,
                    trackName: element.name
                }
                arr.push(obj)
            }

            setTracks(arr)
            console.log()
        })

    }

    return (
        <>
            Son 6 ayda en çok dinlenen 30 sanatçı (ilgiyigitbasi): <br/>
            {artists && artists.map((i)=> <div key={i}>{i}</div>)}
            <br/>
            Son 6 ayda en çok  dinlenen 30 şarkı (ilgiyigitbasi): <br/>
            {tracks && tracks.map((i)=> <div>{i.trackName + '/' + i.artistsNames}</div>)}
        </>
    );
};

export default Charts;

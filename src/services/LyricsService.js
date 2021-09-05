var axios = require("axios").default;
var convert = require('xml-js');


async function getLyrics(artist, song) {
    const data = null;

    const _artist = encodeURIComponent('TaylorSwiftVEVO');
    const _song = encodeURIComponent('Taylor Swift - Blank Space');
    console.log(_artist, _song);


    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", `https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=${_artist}&song=${_song}`);
    xhr.setRequestHeader("x-rapidapi-host", "sridurgayadav-chart-lyrics-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", process.env.REACT_APP_RAPIDHOST_APIKEY);

    xhr.send(data);
}


async function getLyricsAx(artist, song) {

    const _artist = encodeURIComponent('TaylorSwiftVEVO');
    const _song = encodeURIComponent('Taylor Swift - Blank Space');
    console.log(_artist, _song);

    const options = {
        method: 'GET',
        url: `https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=${_artist}&song=${_song}`,
        // params: {artist: 'michael jackson', song: 'bad'},
        headers: {
            'x-rapidapi-host': 'sridurgayadav-chart-lyrics-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDHOST_APIKEY,
        }
    };

    axios.request(options).then(function (response) {
        //   console.log(response.data);
        const ret = convert.xml2js(response.data, {
            compact: true,
            spaces: 4
        });
        console.log(ret);
    }).catch(function (error) {
        console.error(error);
    });
}

async function getLyricsOth() {
    var axios = require("axios").default;

    var options = {
        method: 'GET',
        url: `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=lyrics&q_track=blank%20space&q_artist=taylor%20swift&apikey=${process.env.REACT_APP_MUSIXMATCH_APIKEY}`,
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}





export {
    getLyrics,
    getLyricsAx,
    getLyricsOth
}
import React, { useState } from 'react'
import YTSearch from "youtube-api-v3-search";

function IndexPanel() {

    const APIKEY = 'AIzaSyAMmzD2rr1fpDKlJVoIN3Xx75fykyyprtY';

    const [Query, setQuery] = useState('');
    const [responseList, setResponseList] = useState([]);

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(value.trim());
    }

    const searchKeyPress = async (e) => {
        if(e.key === 'Enter' || e.charCode === 13){
            // initiate YT search for the query
            InitiateYTSearch();
        }
    }

    const InitiateYTSearch = async () => {

        try{
           
            let tempmyList = [];
            // search for videos on Query variable
            await YTSearch(APIKEY, {q:'on my way alan walker', part:'snippet', type:'video'}, (error, result)=>{

                let videos = result.items;
                videos.forEach(e => {
                    tempmyList.push({
                        "link": e.id.videoId,
                        "title": decodeEntities(e.snippet.title),
                        "thumbnail": e.snippet.thumbnails.medium.url,
                        "channelName": decodeEntities(e.snippet.channelTitle)
                    })
                });
                console.table(tempmyList);

                // logic to display custom cards to interface 
            });
    
        }catch(e){
            console.error(e);
        }
        
    }

    const decodeEntities = (encodedString) => {
        var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
        var translate = {
            "nbsp":" ",
            "amp" : "&",
            "quot": "\"" ,
            "lt"  : "<",
            "gt"  : ">"
        };
        return encodedString.replace(translate_re, function(match, entity) {
            return translate[entity];
        }).replace(/&#(\d+);/gi, function(match, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
    }


    return (
        <div>
            YT Search :
            <input
                type="text"
                value={Query}
                onChange={handleQueryChange}
                onKeyPress={searchKeyPress}
            />

            <button onClick={InitiateYTSearch}>Search</button>


            <div>
                {/* Display Music Cards here */}
            </div>


        </div>
    )
}

export default IndexPanel

import React, { useState } from 'react'
import YTSearch from "youtube-api-v3-search";
import CardGridView from '../components/CardGridView';
import MusicCard from "../components/MusicCard"
import SearchPanel from "../components/SearchPanel";

import {getAllPlaylistData} from "../services/DBService"

function IndexPanel(props) {

    const APIKEY = process.env.REACT_APP_YTAPIKEY;

    const [Query, setQuery] = useState('');
    const [videoCards, setVideoCards] =useState([]);
    const [playlistSection, setPlaylistSection] =useState([]);

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

    const InitiateYTSearch = async () => {
        try{
            let tempmyList = [];
            // search for videos on Query variable
            await YTSearch(APIKEY, {q:Query, part:'snippet', type:'video'}, (error, result)=>{

                if(error!=null){
                    alert('Quota Exceeded, try again later !!!')
                    return;
                }

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
                mapListToMusicCards(tempmyList);
            });
    
        }catch(e){
            console.error(e);
        }
        
    }

    const mapListToMusicCards = (list) =>{

        // setVideoCards(list.map(item=>{
        //     return <MusicCard
        //         key={item.link}
        //         id={item.link}
        //         name={item.title}
        //         src={item.thumbnail}
        //         channelName={item.channelName}
        //     />
        // }));

        setVideoCards(
            ()=>{
                return <CardGridView list = {list} loadMediaRef={loadMedia} />
            }
        );

    }

    const loadMedia = (musicObj) => {
        // console.log(musicObj);
        props.mediaChangeRequest(musicObj);
    }

    const handleLoadPlaylists = async () => {
        try{

            const plist = await getAllPlaylistData()

            let tempmyList = [];
            // search for videos on Query variable
            
            mapListToMusicCards(tempmyList);
    
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div>

            <div style={{}}>
                <SearchPanel 
                    inputRef = {handleQueryChange}
                    keyPressRef = {searchKeyPress}
                    submitRef = {InitiateYTSearch}
                    playlistRef = {handleLoadPlaylists}
                />
            </div>


            <div style={{paddingTop:"50px", paddingBottom:"100px"}}>
                {/* Display Music Cards here */}
                {videoCards}
            </div>

            <div style={{paddingTop:"50px", paddingBottom:"100px"}}>
                {/* Display Music Cards here */}
                {playlistSection}
            </div>


        </div>
    )
}

export default IndexPanel

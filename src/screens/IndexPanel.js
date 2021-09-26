import React, { useState, useEffect, useContext } from 'react'
import YTSearch from "youtube-api-v3-search";
import CardGridView from '../components/CardGridView';
import SearchPanel from "../components/SearchPanel";

import {getPlaylistsIDName, getPlaylistByID} from "../services/DBService";

import PlaylistContext from '../context/playlist/PlaylistContext';

function IndexPanel(props) {

    const APIKEY = process.env.REACT_APP_YTAPIKEY;

    const {ctxRefreshPlaylist,setCtxRefreshPlaylist,ctxRefDelPlaylist,setCtxRefDelPlaylist} = useContext(PlaylistContext);

    const [Query, setQuery] = useState('');
    const [videoCards, setVideoCards] =useState([]);

    useEffect(() => {
        if(ctxRefreshPlaylist == null){
            return;
        }

        loadPlaylists(ctxRefreshPlaylist, false);

        // set refresh to null after reorder displayed is completed
        setCtxRefreshPlaylist(null);
    }, [ctxRefreshPlaylist])

    useEffect(()=>{
        if(ctxRefDelPlaylist == null){
            return;
        }
        handlePlaylistRef();
        
        // set playlist view refresh to null after playlist view is displayed again
        setCtxRefDelPlaylist(null);
    },[ctxRefDelPlaylist])

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

        if(Query == null || Query == ''){
            return;
        }

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

    const handlePlaylistRef = async () => {
        try{
            const plist = await getPlaylistsIDName()
            mapPlaylistsToCards(plist);
        }catch(e){
            console.error(e);
        }
    }

    const loadPlaylists = async (playlistObj, queueStart) => {

        // console.log(playlistObj, queueStart);
        
        try{
            const plistTracks = await getPlaylistByID(playlistObj.playlistID)

            // directly plays from playlist queue
            if(queueStart){
                // added check to not start playing when playlist is empty
                if(plistTracks[0]["data"] != null && plistTracks[0]["data"][0] !== undefined){
                    loadMedia(plistTracks[0]["data"]);
                }
                return;
            }

            // displays cards from playlist
            if(plistTracks[0]["data"]!=null){
                mapPlaylistMusicToCards(plistTracks[0]["data"], playlistObj);
            }
            else{
                // playlist empty
                console.log('empty playlist');
            }

        }catch(e){
            console.error(e);
        }
    }

    // displays playlists as cards
    const mapPlaylistsToCards = (list) => {
        setVideoCards(
            ()=>{
                return <CardGridView playlists = {list} playlistRef={loadPlaylists} />
            }
        );
    }

    // displays individual tracks of playlist as cards
    const mapPlaylistMusicToCards = (list, playlistObj) => {
        setVideoCards(
            ()=>{
                return <CardGridView 
                            playlistTracks = {list}
                            playlistObj = {playlistObj}
                            loadMediaRef={loadMedia}
                            playlistRef={loadPlaylists}
                        />
            }
        );
    }

    return (
        <div>

            <div style={{}}>
                <SearchPanel 
                    inputRef = {handleQueryChange}
                    keyPressRef = {searchKeyPress}
                    submitRef = {InitiateYTSearch}
                    playlistRef = {handlePlaylistRef}
                />
            </div>


            <div style={{paddingTop:"50px", paddingBottom:"100px"}}>
                {/* Display Music Cards here */}
                {videoCards}
            </div>


        </div>
    )
}

export default IndexPanel

import React, {useEffect, useRef, useState} from 'react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as QueueService from "../services/QueueService";

import NowPlayingModal from '../components/NowPlayingModal';

const MUIC_SERVER_URL = process.env.REACT_APP_MUSIC_SERVER_URL;

/** Music Object
    videoID	    "youtube video ID"
    videoName	"video name"
    channelName	"channel name"
    imageSrc	"youtube thumnail image url"
 */

export default function MusicScreen(props) {
    var TrackPlayer = useRef();

    const [musicURL, setMusicURL] = useState(null);

    var [globalList, setGlobalList] = useState(null);
    var [pointer, setPointer] = useState(-1);
    var [currentTrack, setCurrentTrack] = useState(null);

    const { mediaSession } = navigator;

    // fires when props.musicObj is changed
    useEffect(()=>{
        if(props.musicObj != null) {
            // normalize queue object
            const _obj = QueueService.normalizeObject(props.musicObj);
            globalList = _obj;
            pointer = 0;

            setGlobalList(_obj);
            setPointer(0);
        }
        else{
            return;
        }
    }, [props.musicObj])

    // fires when global list changes
    useEffect(()=>{

        if(globalList == null){
            return;
        }

        const _track = QueueService.musicDispatcher(globalList, pointer);
        playTrack(_track);
    },[globalList])

    //MediaSessionAPI useEffect
    useEffect(()=>{
        
        if(currentTrack == null){
            return;
        }

        mediaSession.metadata = new window.MediaMetadata({
            title:currentTrack.videoName,
            artist:currentTrack.channelName,
            album:currentTrack.videoName,
            artwork:[
                {
                    src: currentTrack.imageSrc,
                    sizes: '256x256,384x384,512x512',
                    type: 'image/jpeg',
                },
                {
                    src: currentTrack.imageSrc,
                    sizes: '96x96,128x128,192x192',
                    type: 'image/jpeg',
                },
              ]
        });

        // --- Play / Pause not required (handled internally with h5 audio player)
        // mediaSession.setActionHandler('play', onTrackStart);
        // mediaSession.setActionHandler('pause', onTrackStart);

        mediaSession.setActionHandler('nexttrack', onClickNext);
        mediaSession.setActionHandler('previoustrack', onClickPrevious);

        // --- Seek song 'x' seconds
        // mediaSession.setActionHandler('seekforward', );
        // mediaSession.setActionHandler('seekbackward', );

        return () => {
            mediaSession.metadata = null;
          };
    },[currentTrack]);


    const playTrack = (track) => {
        console.log("=== Currently playing ===");
        console.table(track);
        setMusicURL(MUIC_SERVER_URL + track.videoID);
        setCurrentTrack(track);
    }

    const playTrackByPointer = (obj) => {
        const track = obj[0];
        const pointer = obj[1];
        
        if(pointer !== -1){
            setPointer(obj[1]);
            playTrack(track);
            // set current track to updated track
            setCurrentTrack(track);
        }
        else{
            console.log('queue ended');
            // set current track to track playing
            setCurrentTrack(currentTrack);
        }

    }

    const onTrackStart = () => {
        console.log("onPlay");
    }

    const onTrackEnded = () => {
        console.log('playing next track')
        const _obj = QueueService.playNext(globalList, pointer);
        playTrackByPointer(_obj);
            
    }

    const onClickNext = () => {
        console.log('playing next track manually')
        const _obj = QueueService.playNext(globalList, pointer);
        playTrackByPointer(_obj);
    }

    const onClickPrevious = () => {
        console.log('playing previous track manually')
        const _obj = QueueService.playPrevious(globalList, pointer);
        playTrackByPointer(_obj);
    }

    return (
        <div>
            <div>
            <AudioPlayer
                ref={TrackPlayer}
                // autoPlay
                src={musicURL}
                showSkipControls={true}
                showJumpControls={false}

                onPlay={onTrackStart}
                onEnded={onTrackEnded}
                onClickNext={onClickNext}
                onClickPrevious={onClickPrevious}

                customAdditionalControls={
                    [
                        RHAP_UI.LOOP,
                        <NowPlayingModal currentTrack = {currentTrack}/>
                    ]
                }
            />
            </div>
        </div>
    )
}
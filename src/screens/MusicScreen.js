import React, {useEffect, useRef, useState} from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as QueueService from "../services/QueueService";

const MUIC_SERVER_URL = process.env.REACT_APP_MUSIC_SERVER_URL;

export default function MusicScreen(props) {
    var TrackPlayer = useRef();

    const [musicURL, setMusicURL] = useState(null);

    var [globalList, setGlobalList] = useState(null);
    var [pointer, setPointer] = useState(-1);



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

    useEffect(()=>{

        if(globalList == null){
            return;
        }

        const _track = QueueService.musicDispatcher(globalList, pointer);
        playTrack(_track);
    },[globalList])

    const playTrack = (track) => {
        console.log("=== Currently playing ===");
        console.table(track);
        setMusicURL(MUIC_SERVER_URL + track.videoID);
    }

    const playTrackByPointer = (obj) => {
        const track = obj[0];
        const pointer = obj[1];

        if(pointer !== -1){
            setPointer(obj[1]);
            playTrack(track);
        }
        else{
            console.log('queue ended');
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
            />
            </div>
        </div>
    )
}
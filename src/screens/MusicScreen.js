import React, {useEffect, useRef, useState} from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MUIC_SERVER_URL = "https://konnect-app-server.herokuapp.com/stream/";

export default function MusicScreen(props) {
    var TrackPlayer = useRef();

    const [musicURL, setMusicURL] = useState(null);

    // fires when props.musicObj is changed
    useEffect(()=>{
        if(props.musicObj != null) {
            setMusicURL(MUIC_SERVER_URL + props.musicObj.videoID);
        }
    }, [props.musicObj])

    return (
        <div>
            <div>
            <AudioPlayer
                ref={TrackPlayer}
                // autoPlay
                src={musicURL}
                onPlay={e => console.log("onPlay")}
            />
            </div>
        </div>
    )
}
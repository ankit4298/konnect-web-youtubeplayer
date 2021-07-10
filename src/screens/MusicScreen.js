import React, {useRef, useState} from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function MusicScreen() {
    var TrackPlayer = useRef();

    const [musicURL, setMusicURL] = useState('https://konnect-app-server.herokuapp.com/stream/GJm7H9IP5SU');

    return (
        <div>
            <div>
            <AudioPlayer
                ref={TrackPlayer}
                // autoPlay
                src={musicURL}
                onPlay={e => console.log("onPlay")}
            // other props here
            />
            </div >
        </div>
    )
}

export default MusicScreen

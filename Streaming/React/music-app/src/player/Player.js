import React, {useState} from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { loadFile } from './Streaming';

function Player(props) {
    const [duration, setDuration] = useState(0);
    const [streamHandler, setStreamHandler] = useState(null);

    function setDur(dur) {
        setDuration(2);
        console.log(duration);
        setDuration(dur);
        console.log(duration);
    }
    

    function play(duration) {
        setStreamHandler(loadFile(props.currentSong, setDur(duration)));
    }
    function stop() {
        setStreamHandler(null);
    }

    return(
        <div>
            <Previous />
            <PlayPause currentSong={props.currentSong} isPlaying={props.isPlaying} setPlaying={props.setPlaying} play={play} stop={stop} />
            <Skip />
        </div>
    );
}


export default Player;
import React, {useState} from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { loadFile } from './Streaming';

async function Player(props) {
    const [duration, setDuration] = useState(0);

    const [streamHandler, setStreamHandler] = useState(null);

    try {
        if(streamHandler === null){
            setStreamHandler(await loadFile(props.currentSong, setDuration));
        }
    } catch (error) {
        console.log('Error: ' + error);
    }
    

    function play(duration) {
        streamHandler.play(duration);
    }
    function stop() {
        streamHandler.stop();
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
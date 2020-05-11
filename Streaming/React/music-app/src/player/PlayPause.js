import React, { useContext } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { StreamingContext } from './StreamingContext';


function PlayPause(props) {
    const [isPlaying, setPlaying, currentSong, setSong] = useContext(StreamingContext);
    const audio = props.audio;

    async function playPauseClicked() {
        setPlaying(!isPlaying);

        if (audio.paused) {
            audio.play();
            setPlaying(true);
        } else {
            audio.pause()
            setPlaying(false);
        }
    }


    // isPlaying ? isLoading ? PausePicGrey : PausePic : PlayPic
    return (
        <div className="playPause">
            <img src={isPlaying ? PausePic : PlayPic} height="50vh" width="40vh" onClick={playPauseClicked} alt="placeholder_text" />
        </div>
    );

}

export default PlayPause;
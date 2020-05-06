import React, { useContext } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import PausePicGrey from '../assets/pause_grey.png';
import { StreamingContext } from './StreamingContext';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration] = useContext(StreamingContext);

    const audio = document.getElementById("audio");

    async function playPauseClicked() {
        setPlaying(!isPlaying);

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
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
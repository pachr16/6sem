import React, { useContext } from 'react';
import PlayPic from '../assets/play.png';
import PlayPicGrey from '../assets/play_grey.png';
import PausePic from '../assets/pause.png';
import PausePicGrey from '../assets/pause_grey.png';
import { StreamingContext } from './StreamingContext';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading] = useContext(StreamingContext);


    async function playPauseClicked() {
        setPlaying(!isPlaying);
    }


    //isPlaying ? (isLoading ? PlayPic : PlayPicGrey) : (isLoading ? PausePic : PausePicGrey)
    // correct way: isPlaying ? isLoading ? PausePicGrey : PausePic : PlayPic

    return (
        <div className="playPause">
            <img src={isPlaying ? isLoading ? PausePicGrey : PausePic : PlayPic} height="50vh" width="40vh" onClick={playPauseClicked} alt="placeholder_text" />
        </div>
    );

}

export default PlayPause;
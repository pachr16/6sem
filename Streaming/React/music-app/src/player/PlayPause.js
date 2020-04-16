import React from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';

function PlayPause(props) {
    function playPauseClicked() {
        if (props.isPlaying) {
            props.stop();
            props.setPlaying(false);
        }
        else {
            props.play();
            props.setPlaying(true);
        }
    }

    return (
        <img src={props.isPlaying ? PausePic : PlayPic} height="50vh" onClick={playPauseClicked} alt="placeholder_text" />

    );

}

export default PlayPause;
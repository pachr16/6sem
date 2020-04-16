import React from 'react';
import PlayPic from '../assets/play.png'                         ;
import PausePic from '../assets/pause.png'              ;

function PlayPause(props) {
    function playPauseClicked() {
        if (props.isPlaying) {
            props.setPlaying(false);
            return;
        }
        else {
            props.setPlaying(true);
            return;
        }
    }

    return (
        <img src={props.isPlaying ? PausePic : PlayPic} height="50vh" onClick={playPauseClicked} alt="placeholder_penbis" />

    );

}

export default PlayPause;
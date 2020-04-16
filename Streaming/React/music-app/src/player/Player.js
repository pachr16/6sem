import React from 'react';
import PlayPause from './PlayPause';

function Player(props) {
    return(
        <PlayPause currentSong={props.currentSong} isPlaying={props.isPlaying} setPlaying={props.setPlaying} />
    );
}


export default Player;
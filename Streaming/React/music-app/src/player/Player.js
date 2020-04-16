import React from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';

function Player(props) {
    return(
        <div>
        <Previous />
        <PlayPause currentSong={props.currentSong} isPlaying={props.isPlaying} setPlaying={props.setPlaying} />
        <Skip />
        </div>
    );
}


export default Player;
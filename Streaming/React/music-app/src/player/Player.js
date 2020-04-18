import React from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';

function Player() {
    return(
        <div>
            <Previous />
            <PlayPause />
            <Skip />
        </div>
    );
}


export default Player;
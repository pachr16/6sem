import React, { useContext } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration] = useContext(StreamingContext);

    const titles = useSelector(state => state.titles);
    const art = useSelector(state => state.arts[titles.indexOf(currentSong)]);

    return (
        <div className="wrapper">
            
            <div className="albumart">
                <img src={art} height="75vh" alt="missing" />
            </div>
            <div className="player">
                <Previous />
                <PlayPause />
                <Skip />
            </div>
            <div className="songdisplay">
                <h4>{currentSong}</h4>
            </div>
        </div>
    );
}


export default Player;
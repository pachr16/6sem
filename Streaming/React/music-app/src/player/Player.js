import React, { useContext } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading] = useContext(StreamingContext);

    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);

    const hasBeenPaused = useSelector(state => state.hasBeenPaused);

    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const song_url = useSelector(state => state.song_urls[index]);


    return (
        <div className="wrapper">
            <audio></audio>
            
            <div className="albumart">
                <img src={currentSong > 0 ? art : ""} height="75vh" />
            </div>
            <div className="player">
                <Previous />
                <PlayPause />
                <Skip />
            </div>
            <div className="songdisplay">
                <h4>{title}</h4>
            </div>
        </div>
    );
}


export default Player;
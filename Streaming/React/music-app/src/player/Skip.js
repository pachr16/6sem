import React, { useContext } from 'react';
import SkipPic from '../assets/forward.png';
import { StreamingContext } from './StreamingContext';
import { useSelector } from 'react-redux';


function Skip() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious] = useContext(StreamingContext);
    const songids = useSelector(state => state.songids);

    function skip() {
        setPrevious(currentSong);

        var next = 1 + Math.floor(Math.random() * (songids.length-1));

        console.log("Skip calculated this id: " + next);
        setSong(next.toString());
    }

    return (
        <img src={SkipPic} onClick={skip} height="50vh" width="40vh" alt="skip_button" />
    );
}

export default Skip;
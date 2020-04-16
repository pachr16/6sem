import React, { useState, useContext } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { loadFile } from './Streaming';
import { StreamingContext } from './StreamingContext';

function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, streamHandler, setStreamHandler] = useContext(StreamingContext);

    function playPauseClicked() {
        if (streamHandler === null) {
            try {
                setStreamHandler(loadFile({ currentSong, setDuration }));
            } catch (error) {
                console.log("Error! " + error);
            }
        }
        if (isPlaying) {
            streamHandler.stop();
            setPlaying(false);
        }
        else {
            streamHandler.play();
            setPlaying(true);
        }
    }

    return (
        <img src={isPlaying ? PausePic : PlayPic} height="50vh" onClick={playPauseClicked} alt="placeholder_text" />

    );

}

export default PlayPause;
import React, { useContext } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { loadFile } from './Streaming';
import { StreamingContext } from './StreamingContext';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, streamHandler, setStreamHandler] = useContext(StreamingContext);


    // den her er kun midlertidigt fucked/ødelagt for testing purposes, dont worry (trust me, im an engineer)
    function playPauseClicked() {
        //if (streamHandler === {}) {
            try {
                console.log("StreamHandler: " + streamHandler);
                loadFile({ currentSong, setDuration })
                    .then(sthand => {                           // *****OBS****** pt kommer jeg ikke herind, så promise bliver aldrig resolvet - tror det er det der er fejlen
                        console.log("Success?");                // dvs vi skal lave noget om på den måde vi resolver i Streaming.js, I think
                        sthand.play(duration);  
                        console.log("Success!");
                    });
                console.log("StreamHandler: " + streamHandler);
            } catch (error) {
                console.log("Error when trying to create StreamHandler! " + error);
            }
        //}

        /*
        if (isPlaying) {
            streamHandler.stop();
            setPlaying(false);
        }
        else {
            streamHandler.play();
            setPlaying(true);
        }
        */
    }

    return (
        <img src={isPlaying ? PausePic : PlayPic} height="50vh" onClick={playPauseClicked} alt="placeholder_text" />

    );

}

export default PlayPause;
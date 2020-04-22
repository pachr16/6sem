import React, { useState, useContext, useEffect } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { loadFile } from './Streaming';
import { StreamingContext } from './StreamingContext';
import { useSelector } from 'react-redux';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration] = useContext(StreamingContext);  // streamHandler, setStreamHandler
    //const [streamHandler, setStreamHandler] = useState(loadFile({ currentSong, setDuration }));

    const titles = useSelector(state => state.titles);
    const art = useSelector(state => state.arts[titles.indexOf(currentSong)]);
    

    useEffect(() => {
        
    }, [currentSong]);

    async function createStreamHandler() {
        console.log("Creating Streamhandler! Current streamhandler is: ");
        //await loadFile({ currentSong, setDuration })
        //    .then(newStreamHandler => setStreamHandler(newStreamHandler));
        await loadFile({ currentSong, setDuration });
        console.log("Created new streamhandler: ");

        //await streamHandler.stop();
        setPlaying(true);
    }

    async function playPauseClicked() {
        //createStreamHandler();

        /*
        if (isPlaying) {
            await streamHandler.stop();
        } else {
            await streamHandler.play();
        }
        */
        setSong("The Sound of Speed");
        console.log(art);
        setPlaying(!isPlaying);
    }

    /*
    // den her er kun midlertidigt fucked/ødelagt for testing purposes, dont worry (trust me, im an engineer)
    function playPauseClicked2() {
        //if (streamHandler === {}) {
            try {
                console.log("StreamHandler: " + streamHandler);
                loadFile({ currentSong, setDuration })
                    .then(sthand => {                           // *****OBS****** pt kommer jeg ikke herind, så promise bliver aldrig resolvet - tror det er det der er fejlen
                        console.log("Success?");                // dvs vi skal lave noget om på den måde vi resolver i Streaming.js, I think
                        sthand.play(duration);                  // se evt duplicate functionen nedenunder
                        console.log("Success!");
                    });
                console.log("StreamHandler: " + streamHandler);
            } catch (error) {
                console.log("Error when trying to create StreamHandler! " + error);
            }
        //}

        if (isPlaying) {
            streamHandler.stop();
            setPlaying(false);
        }
        else {
            streamHandler.play();
            setPlaying(true);
        }
}

async function playPauseClicked() {                 // det her må vi godt - selve React-functionen må ikke være async, men vi må godt definere andre async funcs her uden for return
    //if (streamHandler === {}) {
    try {
        console.log("StreamHandler before: " + streamHandler);
        setStreamHandler(await loadFile({ currentSong, setDuration }));      // det løser await problemet, men det her promise bliver stadig aldrig resovlet
        console.log("StreamHandler now: " + streamHandler);                 // ... for vi når aldrig til den her linje - den console.logger kun den første udskrift
    } catch (error) {                                                       // muligvis er det noget med io-socket i Streaming, den smider et par errors
        console.log("Error when trying to create StreamHandler! " + error);
    }
    //}


    if (isPlaying) {
        streamHandler.stop();
        setPlaying(false);
    }
    else {
        streamHandler.play();
        setPlaying(true);
    }

}
    */

    return (
        <div>
            <img src={art} height="75vh" alt="missing" />
            <img src={isPlaying ? PausePic : PlayPic} height="50vh" onClick={playPauseClicked} alt="placeholder_text" />
        </div>
    );

}

export default PlayPause;
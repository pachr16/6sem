import React, { useContext, useEffect } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { loadFile } from './Streaming';
import { StreamingContext } from './StreamingContext';
import { useSelector } from 'react-redux';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration] = useContext(StreamingContext);  // streamHandler, setStreamHandler
    //const [streamHandler, setStreamHandler] = useState(loadFile({ currentSong, setDuration }));

    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);

    var promise;

    useEffect(() => {
        createStreamHandler();
    }, [currentSong]);

    async function createStreamHandler() {
        if (isPlaying) {
            // destroy existing loadFile promise?
        }
        if (currentSong != -1) {
            console.log("Creating Streamhandler! For this song_url: " + song_url);
            //await loadFile({ currentSong, setDuration })
            //    .then(newStreamHandler => setStreamHandler(newStreamHandler));
            promise = await loadFile({ song_url, setDuration, size });
            console.log("Created new streamhandler: " + promise);



            //await streamHandler.stop();
            setPlaying(true);
        }
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
        const stop = await promise.stop();
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
        <div className="playPause">
            <img src={isPlaying ? PausePic : PlayPic} height="50vh" width="40vh" onClick={playPauseClicked} alt="placeholder_text" />

        </div>
    );

}

export default PlayPause;
import React, { useContext, useEffect } from 'react';
import PlayPic from '../assets/play.png';
import PlayPicGrey from '../assets/play_grey.png';
import PausePic from '../assets/pause.png';
import PausePicGrey from '../assets/pause_grey.png';
import { loadFile } from './Streaming';
import { StreamingContext } from './StreamingContext';
import { useSelector, useDispatch } from 'react-redux';
import { startPlaying, startLoading, stopLoading, stopPlaying } from '../redux/actions';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading] = useContext(StreamingContext);

    const dispatch = useDispatch();

    //const isPlaying = useSelector(state => state.isPlaying);
    //const isLoading = useSelector(state => state.isLoading);
    const hasBeenPaused = useSelector(state => state.hasBeenPaused);

    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);



    useEffect(() => {
        console.log("useEffect triggered!");
        createStreamHandler();
    }, [currentSong]);

    async function createStreamHandler() {
        if (currentSong != -1) {

            //if (isPlaying) {

            setLoading(true);

            console.log("Creating Streamhandler! For this song_url: " + song_url);
            const promise = await loadFile({ song_url, setDuration, size });
            console.log("Created new streamhandler: " + promise);

            setLoading(false);

            //}
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
        //const stop = await promise.stop();



        //setLoading(!isLoading);
        setPlaying(!isPlaying);


        if (!isLoading) {
            //dispatch(startLoading());
        } else {
            //dispatch(stopLoading());
        }


        //dispatch(stopPlaying());
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

    function selectPlayPausePic() {
        if (isPlaying) {
            if (isLoading) {
                return PlayPicGrey;
            } else {
                return PlayPic;
            }
        } else {
            if (isLoading) {
                return PausePicGrey;
            } else {
                return PausePic;
            }
        }
    }

    //isPlaying ? (isLoading ? PlayPic : PlayPicGrey) : (isLoading ? PausePic : PausePicGrey)

    return (
        <div className="playPause">
            <img src={isPlaying ? isLoading ? PausePicGrey : PausePic : PlayPic} height="50vh" width="40vh" onClick={playPauseClicked} alt="placeholder_text" />

        </div>
    );

}

export default PlayPause;
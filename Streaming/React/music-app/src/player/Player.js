import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { MUSIC_SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading] = useContext(StreamingContext);

    // for finding data about the current song
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);

    // for the actual audio handling
    const audio = document.getElementById("audio");
    const mediaSource = new MediaSource();
    const mediaSourceURL = URL.createObjectURL(mediaSource);
    audio.src = mediaSourceURL;


    useEffect(() => {
        if (currentSong != -1) {

            setLoading(true);   // we start loading

            // if there is already a song loading/playing, remove that sourcebuffer.
            if (mediaSource.activeSourceBuffers[0] != null) {
                mediaSource.removeSourceBuffer(mediaSource.activeSourceBuffers[0]);     // removes sourcebuffer from list, but if it still exists it's a problem - still holding the data?
            }

            // determine number of segments
            const totalSegments = size / 200000;    // segments of 200 kb each
            console.log("There will be " + totalSegments + " total segments.");

            // add a sourcebuffer for the new song
            const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');    // maybe need codecs

            for (let seg = 1; seg <= totalSegments; seg++) {
                console.log("Now fetching segment: " + seg + " of song: " + title);

                fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                    .then(function (resp) {
                        return resp.arrayBuffer();
                    })
                    .then(function (audioSegment) {
                        audioSourceBuffer.appendBuffer(audioSegment);       // !! NULLPOINTER WARNING !! -- audiosourcebuffer might be null if we are still loading while we switch songs

                        if (seg == 1) {
                            audio.play();   // when we have received the first segment, start playing
                        }

                        if (seg == totalSegments) {     // if we have reached the final segment, we are done loading
                            setLoading(false);
                        }
                    });
            }


        }
    }, [currentSong])


    return (
        <div className="wrapper">
            <audio id="audio"></audio>

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
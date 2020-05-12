import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { MUSIC_SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource, audio, setAudio] = useContext(StreamingContext);

    // for finding data about the current song: , mediaSource, setMediaSource
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);


    useEffect(() => {
        if (currentSong != -1) {
            console.log("Creating new MediaSource!");
            setMediaSource(new MediaSource());

            audio.src = URL.createObjectURL(mediaSource);

            var audioSourceBuffer;
            mediaSource.addEventListener('sourceopen', function () {
                console.log("Mediasource has indicated that it is open!");
                if (mediaSource.sourceBuffers[0] == null) {
                    audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
                    console.log("mediaSource has added a new audiosourcebuffer!");
                    console.log("The added sourcebuffer is: " + audioSourceBuffer);
                }
            });

            console.log("Mediasource is: " + mediaSource.toString());
            console.log("It contains these sourcebuffers: ");
            console.log(mediaSource.sourceBuffers);

            var isLoading = true;   // we start loading

            // determine number of segments
            var totalSegments = size / 200000;    // segments of 200 kb each
            console.log("There will be " + totalSegments + " segments.");
            var seg = 0;

            // we should always expect to receive one not-full segment
            console.log("Now fetching the first two segments of song: " + title);
            fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                .then(function (resp) {
                    return resp.arrayBuffer();
                })
                .then(function (audioSegment) {
                    audioSourceBuffer.appendBuffer(audioSegment);

                    console.log("Received segment " + seg);
                    console.log("Begin playing!");
                    audio.play();   // when we have received the first segment, start playing
                    setPlaying(true);

                    seg++;
                    fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                        .then(function (resp) {
                            return resp.arrayBuffer();
                        })
                        .then(function (audioSegment) {
                            audioSourceBuffer.appendBuffer(audioSegment);
                            console.log("Received segment " + seg);
                        });
                });

            // listening for updates, to load next segments continuously
            audio.ontimeupdate = function (event) {
                console.log("We have received an update event!");

                if (isLoading && Math.round(audio.currentTime % 2) == 0) {
                    seg++;

                    fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                        .then(function (resp) {
                            return resp.arrayBuffer();
                        })
                        .then(function (audioSegment) {
                            audioSourceBuffer.appendBuffer(audioSegment);
                            console.log("Received segment " + seg);

                            if (seg == Math.floor(totalSegments)) {     // if we have reached the final segment, we are done loading
                                console.log("We should be done loading now");
                                isLoading = false;
                            }
                        });
                }
            };
        }
    }, [currentSong])


    return (
        <div className="wrapper">
            <div className="albumart">
                <img src={currentSong > 0 ? art : ""} height="75vh" />
            </div>
            <div className="player">
                <Previous />
                <PlayPause audio={audio} />
                <Skip />
            </div>
            <div className="songdisplay">
                <h4>{title}</h4>
            </div>
        </div>
    );
}


export default Player;
import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { MUSIC_SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource] = useContext(StreamingContext);

    // for finding data about the current song: , mediaSource, setMediaSource
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);

    // setup audio
    const audio = document.createElement('audio');

    var totalSegments = 0;
    var seg = 0;

    useEffect(() => {
        if (currentSong != -1) {
            if (isPlaying) {
                //mediaSource.removeSourceBuffer(mediaSource.sourceBuffers[0]);
                //mediaSource.sourceBuffers[0].remove(0, mediaSource.sourceBuffers[0].buffered.end(0));
                //console.log("Creating new MediaSource!");
                //setMediaSource(new MediaSource());
                audio.pause();
                setPlaying(false);
                // clear old mediasource somehow!
            }


            audio.src = URL.createObjectURL(mediaSource);

            var audioSourceBuffer;
            mediaSource.addEventListener('sourceopen', function () {
                console.log("Mediasource has indicated that it is open!");
                if (mediaSource.sourceBuffers[0] == null) {
                    audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
                    console.log("mediaSource has added a new audiosourcebuffer! " + mediaSource.readyState);
                    console.log("The added sourcebuffer is: " + audioSourceBuffer);
                }
            });

            console.log("Mediasource is: " + mediaSource.toString());
            console.log("It contains these sourcebuffers: ");
            console.log(mediaSource.sourceBuffers);

            var isLoading = true;   // we start loading

            // if there is already a song loading/playing, remove that sourcebuffer.
            if (mediaSource.activeSourceBuffers[0] != null) {
                console.log("Removing current audiosourcebuffer to start new song");
                mediaSource.removeSourceBuffer(mediaSource.activeSourceBuffers[0]);     // removes sourcebuffer from list, but if it still exists it's a problem - still holding the data?
            }

            mediaSource.sourceBuffers.onaddsourcebuffer = function (event) {
                // determine number of segments
                totalSegments = size / 200000;    // segments of 200 kb each
                console.log("There will be " + totalSegments + " total segments.");

                // add a sourcebuffer for the new song
                //const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');    // maybe need codecs

                // we should always expect to receive one not-full segment, meaning we always round up, or take 1 extra segment.
                console.log("Now fetching the first two segment of song: " + title);
                seg = 0;
                fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                    .then(function (resp) {
                        return resp.arrayBuffer();
                    })
                    .then(function (audioSegment) {
                        audioSourceBuffer.appendBuffer(audioSegment);       // !! NULLPOINTER WARNING !! -- audiosourcebuffer might be null if we are still loading previous song

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
            }

            // listening for updates, to load next segments continuously
            audio.ontimeupdate = function (event) {
                console.log("We have received an update event!");

                if (isLoading && Math.round(audio.currentTime % 2) == 0) {
                    console.log(audio.currentTime);
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
            console.log("Added eventListener!");
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
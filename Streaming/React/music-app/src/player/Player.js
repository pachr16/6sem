import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { MUSIC_SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource] = useContext(StreamingContext);

    // klippet fra usecontext midlertidigt: 

    // for finding data about the current song
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);

    // setup audio
    //const mediaSource = new MediaSource();
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(mediaSource);
    // the tostal amount of segments for the song curently playing
    var totalSegments = -1;
    // the last segment of the song that have ben fetched
    var lastFetchedsegment = -1;
    //used to deside if new segments shuld be fetched
    var isLoading = false;

    var sBuffer = null

    useEffect(() => {
        if (currentSong != -1) {
            if (isPlaying) {
                audio.pause()
                //make sure to clear sourcebuffer and set up lisners for init for when  buffer is cleared
            }


            mediaSource.addEventListener('sourceopen', createSourcebuffer());

            mediaSource.sourceBuffers.addEventListener('addsourcebuffer', initSong());


            //set up listner for fetching more sing data
            createFetchOnAudioUpdate();

        }
    }, [currentSong])

    function createSourcebuffer() {
        if (mediaSource.sourceBuffers[0] == null) {
            sBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            console.log("mediaSource has added a new audiosourcebuffer! ");
            console.log(mediaSource);
            console.log("The added sourcebuffer is: " + sBuffer);

        }
    }

    function initSong() {
        // determine number of segments
        totalSegments = size / 200000;    // segments of 200 kb each
        console.log("There will be " + totalSegments + " total segments.");

        // add a sourcebuffer for the new song
        //const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');    // maybe need codecs

        // we should always expect to receive one not-full segment, meaning we always round up, or take 1 extra segment.
        console.log("Now fetching the first two segment of song: " + title);
        lastFetchedsegment = 0;
        fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${lastFetchedsegment}`)
            .then(function (resp) {
                return resp.arrayBuffer();
            })
            .then(function (audioSegment) {
                sBuffer.appendBuffer(audioSegment);       // !! NULLPOINTER WARNING !! -- audiosourcebuffer might be null if we are still loading previous song

                console.log("Received segment " + lastFetchedsegment);
                console.log("Begin playing!");
                console.log('mediaSource before playing');
                console.log(mediaSource);
                audio.play();   // when we have received the first segment, start playing
                setPlaying(true);

                lastFetchedsegment++;
                fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${lastFetchedsegment}`)
                    .then(function (resp) {
                        return resp.arrayBuffer();
                    })
                    .then(function (audioSegment) {
                        sBuffer.appendBuffer(audioSegment);
                        console.log("Received segment " + lastFetchedsegment);
                        isLoading = true;   // we start loading
                    });
            });
    }

    function createFetchOnAudioUpdate() {
        // listening for updates, to load next segments continuously
        audio.ontimeupdate = function (event) {
            console.log("We have received an update event!");

            if (isLoading && Math.round(audio.currentTime % 2) == 0) {
                console.log(audio.currentTime);
                lastFetchedsegment++;

                fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${lastFetchedsegment}`)
                    .then(function (resp) {
                        return resp.arrayBuffer();
                    })
                    .then(function (audioSegment) {
                        sBuffer.appendBuffer(audioSegment);
                        console.log("Received segment " + lastFetchedsegment);

                        if (lastFetchedsegment == Math.floor(totalSegments)) {     // if we have reached the final segment, we are done loading
                            console.log("We should be done loading now");
                            isLoading = false;
                        }
                    });
            }
        };
    }


    function oldplayer() {
        //     useEffect(() => {

        //         if (currentSong != -1) {
        //             if (previousSong != -1) {
        //                 //mediaSource.removeSourceBuffer(mediaSource.sourceBuffers[0]);
        //                 //mediaSource.sourceBuffers[0].remove(0, mediaSource.sourceBuffers[0].buffered.end(0));
        //                 console.log("Creating new MediaSource!");
        //                 setMediaSource(new MediaSource());
        //             }


        //             var audioSourceBuffer;
        //             mediaSource.addEventListener('sourceopen', function () {
        //                 console.log("Mediasource has indicated that it is open!");
        //                 if (mediaSource.sourceBuffers[0] == null) {
        //                     audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
        //                     console.log("mediaSource has added a new audiosourcebuffer! " + mediaSource.readyState);
        //                     console.log("The added sourcebuffer is: " + audioSourceBuffer);
        //                 }
        //             });

        //             console.log("Mediasource is: " + mediaSource.toString());
        //             console.log("It contains these sourcebuffers: ");
        //             console.log(mediaSource.sourceBuffers);

        //             var isLoading = true;   // we start loading
        //             initSong();

        //             // if there is already a song loading/playing, remove that sourcebuffer.
        //             // if (mediaSource.activeSourceBuffers[0] != null) {
        //             //     console.log("Removing current audiosourcebuffer to start new song");
        //             //     mediaSource.removeSourceBuffer(mediaSource.activeSourceBuffers[0]);     // removes sourcebuffer from list, but if it still exists it's a problem - still holding the data?
        //             // }

        //             // determine number of segments
        //             const totalSegments = size / 200000;    // segments of 200 kb each
        //             console.log("There will be " + totalSegments + " total segments.");

        //             // add a sourcebuffer for the new song
        //             //const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');    // maybe need codecs

        //             // we should always expect to receive one not-full segment, meaning we always round up, or take 1 extra segment.
        //             console.log("Now fetching the first two segment of song: " + title);
        //             var seg = 0;
        //             fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
        //                 .then(function (resp) {
        //                     return resp.arrayBuffer();
        //                 })
        //                 .then(function (audioSegment) {
        //                     audioSourceBuffer.appendBuffer(audioSegment);       // !! NULLPOINTER WARNING !! -- audiosourcebuffer might be null if we are still loading previous song

        //                     console.log("Received segment " + seg);
        //                     console.log("Begin playing!");
        //                     audio.play();   // when we have received the first segment, start playing

        //                     seg++;
        //                     fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
        //                         .then(function (resp) {
        //                             return resp.arrayBuffer();
        //                         })
        //                         .then(function (audioSegment) {
        //                             audioSourceBuffer.appendBuffer(audioSegment);
        //                             console.log("Received segment " + seg);
        //                         });
        //                 });

        //             // listening for updates, to load next segments continuously
        //             audio.ontimeupdate = function (event) {
        //                 console.log("We have received an update event!");

        //                 if (isLoading && Math.round(audio.currentTime % 2) == 0) {
        //                     console.log(audio.currentTime);
        //                     seg++;

        //                     fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
        //                         .then(function (resp) {
        //                             return resp.arrayBuffer();
        //                         })
        //                         .then(function (audioSegment) {
        //                             audioSourceBuffer.appendBuffer(audioSegment);
        //                             console.log("Received segment " + seg);

        //                             if (seg == Math.floor(totalSegments)) {     // if we have reached the final segment, we are done loading
        //                                 console.log("We should be done loading now");
        //                                 isLoading = false;
        //                             }
        //                         });
        //                 }
        //             };
        //             console.log("Added eventListener!");
        //         }
        //     }, [currentSong])

    }


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
import ss from 'socket.io-stream';

var socket = io('http://localhost:2000', { autoConnect: false });


async function miscStartStream(songname) {
    socket.open();

    console.log("socet io has opened");
    //const response = await fetch(url + '/getTrack?songName=' + songName, { responseType: 'arraybuffer', });



    const loadFile = (onLoadProcess) =>
        new Promise(async (resolve, reject) => {
            socket.emit('streamSong', songname, () => { });
            ss(socket).on('song-stream', (stream, { stat }) => {
                stream.on('data', (data) => {
                    // calculate loading process rate
                    const loadRate = (data.length * 100) / stat.size;
                    onLoadProcess(loadRate);
                    // next step here
                })
            });



            socket.emit('playSong', 'beyonce')
            // create audio context
            const audioContext = getAudioContext();
            // create audioBuffer (decode audio file)
            const audioBuffer = await audioContext.decodeAudioData(response.data);

            // create audio source
            source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);

            // play audio
            source.start();
            startedAt = Date.now();
            playing = true;
        }

function getAudioContext() {
                AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContent = new AudioContext();
                return audioContent;
            }
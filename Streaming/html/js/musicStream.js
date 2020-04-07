var socket = io('http://localhost:2000', { autoConnect: false });


async function miscStartStream(songname) {
    let source = null;
    let playWhileLoadingDuration = 0;
    let startAt = 0;
    let audioBuffer = null;
    let activeSource = null;

    //from props find a solution!
    const setDuration = 0;



    const audioContext = getAudioContext();
    console.log("miscStartStream y'all!");
    socket.open();
    console.log("Howdy partner, socket is open for business!");

    console.log("socket io has opened");
    //const response = await fetch(url + '/getTrack?songName=' + songName, { responseType: 'arraybuffer', });



    //const loadFile = (onLoadProcess) =>

    return new Promise(async (resolve, reject) => {
        socket.emit('streamSong', songname, () => { });
        ss(socket).on('song-stream', (stream, { stat }) => {

            // how far in the buffer are we
            let rate = 0;
            // is there data in the buffer
            let isData = false;

            stream.on('data', async (data) => {

                const audioBufferChunk = await audioContext.decodeAudioData(withWaveHeader(data, 2, 44100));

                const newaudioBuffer = (source && source.buffer)
                    ? appendBuffer(source.buffer, audioBufferChunk, audioContext)
                    : audioBufferChunk;
                source = audioContext.createBufferSource();
                source.buffer = newaudioBuffer;

                // calculate loading process rate
                const loadRate = (data.length * 100) / stat.size;
                rate += loadRate

                //changeAudionState is called here maby its a visualizer thingy?

                if (rate >= 100) {
                    clearInterval(whileLoadingInterval);
                    audioBuffer = source.buffer;
                    const inSec = (Date.now() - startAt) / 1000;
                    activeSource.stop();
                    play(inSec);
                    resolve({ play, stop, setVolume });
                }
                isData = true;
                // first time load
                if (isData && rate === loadRate) {
                    const duration = (100 / loadRate) * audioBufferChunk.duration;
                    setDuration(duration)

                };
        });
    });

    /*
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
*/
});
}
function getAudioContext() {
    AudioContext = window.AudioContext || window.webkitAudioContext;    // for cross-browser support (?)
    const audioContent = new AudioContext();
    return audioContent;
}

function whileLoadingInterval() {
    return setInterval(() => {
        if (startAt) {
            const inSec = (Date.now() - startAt) / 1000;
            if (playWhileLoadingDuration && inSec >= playWhileLoadingDuration) {
                playWhileLoading(playWhileLoadingDuration);
                playWhileLoadingDuration = source.buffer.duration
            }
        } else if (source) {
            playWhileLoadingDuration = source.buffer.duration;
            startAt = Date.now();
            playWhileLoading();
        }
    }, 500);
}

function playWhileLoading(duration = 0) {
    source.connect(audioContext.destination);
    source.connect(gainNode);
    source.connect(analyser);
    source.start(0, duration);
    activeSource = source;
}


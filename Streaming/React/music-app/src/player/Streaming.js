import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';
import { withWaveHeader, appendBuffer } from './waveHeader';

const url = "http://localhost:2000";

const socket = socketClient.connect(url);

const getAudioContext = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();  // is not allowed to start before the user interacts with the site

    return audioContext;
};

const loadFile = (props) => new Promise(async (resolve, reject) => {
    try {
        const { currentSong, setDuration } = props;
        let source = null;
        let playWhileLoadingDuration = 0;
        let startAt = 0;
        let audioBuffer = null;
        let activeSource = null;

        const audioContext = getAudioContext();


        const playWhileLoading = (duration = 0) => {
            source.connect(audioContext.destination);
            source.start(0, duration);
            activeSource = source;
        };

        function play(resumeTime = 0) {
            source = audioContext.createBufferSource();
            source.buffer = audioBuffer;

            source.connect(audioContext.destination);

            source.start(0, resumeTime);
        };

        const whileLoadingInterval = setInterval(() => {
            if (startAt) {
                const inSec = (Date.now() - startAt) / 1000;
                if (playWhileLoadingDuration && inSec >= playWhileLoadingDuration) {
                    playWhileLoading(playWhileLoadingDuration);
                    playWhileLoadingDuration = source.buffer.duration;
                }
            }
            else if (source) {
                playWhileLoadingDuration = source.buffer.duration;
                startAt = Date.now();
                playWhileLoading();
            }

        }, 500);

        const stop = () => source && source.stop(0);

        const stream = ss.createStream();
        ss(socket).emit('getSong', currentSong, stream, () => { });
        //ss(socket).on('songStream', (stream, {stat}) => {
        let rate = 0;
        let isData = false;
        stream.on('data', async (data) => {
            //console.log("Data received consists of: " + data);
            const audioBufferChunk = await audioContext.decodeAudioData(withWaveHeader(data, 2, 44100));
            const newAudioBuffer = (source && source.buffer) ? appendBuffer(source.buffer, audioBufferChunk, audioContext) : audioBufferChunk;
            source = audioContext.createBufferSource();
            source.buffer = newAudioBuffer;

            const loadRate = (data.length * 100) / 35872846; // stat.size;

            rate = rate + loadRate;
            console.log("Loaded: " + rate);

            if (rate >= 99.9) {
                console.log("rate has hit more than 100");
                clearInterval(whileLoadingInterval);
                audioBuffer = source.buffer;
                const inSec = (Date.now() - startAt) / 1000;
                activeSource.stop();
                play(inSec);
                resolve({ play, stop });
            }
            isData = true;

            if (isData && rate === loadRate) {
                const duration = (100 / loadRate) * audioBufferChunk.duration;
                setDuration(duration);
            }
        });
        //});

        ss(socket).on('error', (error) => {
            console.log(error);
        });
    }
    catch (e) {
        console.log(e);
    }
});

export { getAudioContext, loadFile }
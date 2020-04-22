import React, { useState, createContext } from 'react';
import { loadFile } from './Streaming.js';

export const StreamingContext = createContext();

export const StreamingInfoProvider = (props) => {
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setSong] = useState('');
    const [duration, setDuration] = useState(0);
    //const [streamHandler, setStreamHandler] = useState(loadFile({ currentSong, setDuration })); // maybe use new Promise() and somehow declare that the promise can contain two methods (play/stop)
                                                            // forslag: Promise.resolve(() => {}, () => {})
    

    return (
        <StreamingContext.Provider value={[isPlaying, setPlaying, currentSong, setSong, duration, setDuration]}> {/* streamHandler, setStreamHandler */}
            {props.children}
        </StreamingContext.Provider>
    );
}
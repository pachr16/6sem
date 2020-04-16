import React, { useState, createContext } from 'react';


export const StreamingContext = createContext();

export const StreamingInfoProvider = (props) => {
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setSong] = useState('beyonce');
    const [duration, setDuration] = useState(0);
    const [streamHandler, setStreamHandler] = useState(null);


    return (
        <StreamingContext.Provider value={[isPlaying, setPlaying, currentSong, setSong, duration, setDuration, streamHandler, setStreamHandler]}>
            {props.children}
        </StreamingContext.Provider>
    );
}
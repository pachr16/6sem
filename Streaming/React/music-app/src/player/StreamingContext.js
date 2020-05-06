import React, { useState, createContext } from 'react';

export const StreamingContext = createContext();

export const StreamingInfoProvider = (props) => {
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setSong] = useState(-1);
    const [duration, setDuration] = useState(0);
    

    return (
        <StreamingContext.Provider value={[isPlaying, setPlaying, currentSong, setSong, duration, setDuration]}>
            {props.children}
        </StreamingContext.Provider>
    );
}
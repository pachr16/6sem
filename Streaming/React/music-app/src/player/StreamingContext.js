import React, { useState, createContext } from 'react';

export const StreamingContext = createContext();

export const StreamingInfoProvider = (props) => {
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setSong] = useState(-1);
    const [duration, setDuration] = useState(0);
    const [isLoading, setLoading] = useState(false);
    

    return (
        <StreamingContext.Provider value={[isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading]}>
            {props.children}
        </StreamingContext.Provider>
    );
}
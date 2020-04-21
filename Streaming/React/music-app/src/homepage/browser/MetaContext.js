import React, { createContext, useState } from 'react';

export const MetaContext = createContext();

export function MetaProvider(props) {
    const [titles, setTitles] = useState([]);
    const [songDurations, setSongDurations] = useState([]);
    const [song_urls, setSong_urls] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [arts, setArts] = useState([]);


    return(
        <MetaContext.Provider value={[titles, setTitles, songDurations, setSongDurations, song_urls, setSong_urls, sizes, setSizes, albums, setAlbums, artists, setArtists, arts, setArts]}>
            {props.children}
        </MetaContext.Provider>
    );
}
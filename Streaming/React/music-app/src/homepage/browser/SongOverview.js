import React, { useEffect } from 'react';
import SingleSong from './SingleSong';
import { useSelector } from 'react-redux';

function SongOverview() {
    const song_urls = useSelector(state => state.song_urls);

    const newSongcards = song_urls.map((url, index) => (<SingleSong val={index}/>));

    return (
        <div>
            {newSongcards}
        </div>
    );
}

export default SongOverview;
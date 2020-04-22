import React from 'react';
import SingleSong from './SingleSong';
import { useSelector } from 'react-redux';

function SongOverview() {
    const songids = useSelector(state => state.songids);

    const newSongcards = songids.map((url, index) => (<SingleSong val={index}/>));

    return (
        <div>
            {newSongcards}
        </div>
    );
}

export default SongOverview;
import React, { useEffect } from 'react';
import SingleSong from './SingleSong';
import { useSelector } from 'react-redux';

function SongOverview() {
    const titles = useSelector(state => state.titles);
    const number = titles.length;

    useEffect(() => {
        songcards();
    });

    const songcards = () => {
        for (let i = 0; i < number; i++) {
            console.log("Returning songcard number: " + i);
            //return <SingleSong val={i} />;
            // document.body.appendChild(<div><SingleSong val={i}/></div>);     // ?????
        }
    }

    //document.body.appendChild(something);   // this might be useful 

    return (
        <div>
            <SingleSong val="0" />
            <SingleSong val="1" />
            <SingleSong val="2" />
            <SingleSong val="3" />
            <SingleSong val="4" />
            <SingleSong val="5" />
            <SingleSong val="6" />
            <SingleSong val="7" />
            <SingleSong val="8" />
        </div>
    );
}

export default SongOverview;
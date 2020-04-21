import React, { useContext } from 'react'
import { MetaContext } from './MetaContext';


/* for displaying the cards with info about each song, to be shown in an overview list */
function SingleSong(props) {
    const [titles, songDurations, song_urls, sizes, albums, artists, arts] = useContext(MetaContext);

    return(
        <div className="songCard">
            <img height="4%" width="4%" src={arts[props.key]} alt="missing"></img>     {/* vi tænker at bruge en url til der hvor vi har en db til at hoste billeder */}

            <p>
                {artists[props.key]}
            </p>
            <p>
                {titles[props.key]}
            </p>
            <p>
                {albums[props.key]}
            </p>
            <p>
                {songDurations[props.key]} sec
            </p>

        </div>
    );
}

export default SingleSong;
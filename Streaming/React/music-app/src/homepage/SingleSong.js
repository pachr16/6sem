import React from 'react'
import '../App.css';


/* for displaying the cards with info about each song, to be shown in an overview list */
function SingleSong(props) {
    return(
        <div className="songCard">
            <img height="4%" width="4%" src={props.art}></img>     {/* vi tænker at bruge en url til der hvor vi har en db til at hoste billeder */}

            <p>
                {props.artist}
            </p>
            <p>
                {props.song}
            </p>
            <p>
                {props.album}
            </p>
            <p>
                {props.duration}
            </p>

        </div>
    );
}

export default SingleSong;
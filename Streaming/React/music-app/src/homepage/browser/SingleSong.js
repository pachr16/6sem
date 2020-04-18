import React from 'react'


/* for displaying the cards with info about each song, to be shown in an overview list */
function SingleSong(props) {
    return(
        <div className="songCard">
            <img height="4%" width="4%" src={props.art} alt="missing"></img>     {/* vi tænker at bruge en url til der hvor vi har en db til at hoste billeder */}

            <p>
                {props.data.artist}
            </p>
            <p>
                {props.data.song}
            </p>
            <p>
                {props.data.album}
            </p>
            <p>
                {props.data.duration}
            </p>

        </div>
    );
}

export default SingleSong;
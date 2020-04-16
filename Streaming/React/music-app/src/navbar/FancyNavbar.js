import React from 'react';
import './navbar.css';
import NavigableLogo from './NavigableLogo';
import NavLinks from './NavLinks';
import Player from '../player/Player';


function FancyNavbar(props){
    return(
        <div className="navBackground">
          <NavigableLogo />
          <Player currentSong={props.currentSong} isPlaying={props.isPlaying} setPlaying={props.setPlaying} />
          <NavLinks className="navLinks" />
        </div>
    )
}
export default FancyNavbar
import React, { useContext } from 'react';
import './navbar.css';
import NavigableLogo from './NavigableLogo';
import NavLinks from './NavLinks';
import Player from '../player/Player';
import { AuthorizationContext } from '../homepage/login/AuthorizationContext'; 


function FancyNavbar(){
  const [loggedID, setLoggedID] = useContext(AuthorizationContext);

    return(
        <div className="navBackground">
          <NavigableLogo />
          {loggedID > 0 ? < Player /> : "" }
          <NavLinks className="navLinks" />
        </div>
    )
}
export default FancyNavbar
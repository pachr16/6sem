import React from 'react'
import './navbar.css';
import NavigableLogo from './NavigableLogo'
import NavLinks from './NavLinks'


function FancyNavbar(){
    return(
        <div className="navBackground">
          <NavigableLogo />
          <NavLinks />
        </div>
    )
}
export default FancyNavbar
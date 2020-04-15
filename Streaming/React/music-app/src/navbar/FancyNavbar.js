import React from 'react'
import NavigableLogo from './NavigableLogo'
import NavLinks from './NavLinks'


function FancyNavbar(){
    return(
        <div>
            <h1 className="thisIsFormattingForTheMainTitleOfTheGenericUnnamedStreamingServiceThatWeHaventMadeYet">
        Generic Unnamed Streaming Service
            </h1>
          <NavigableLogo />
          <NavLinks />
        </div>
    )
}
export default FancyNavbar
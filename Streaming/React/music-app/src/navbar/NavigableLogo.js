import React from 'react';
import { Link } from 'react-router-dom';
import logo from './placeholder_logo.jpg';

function NavigableLogo() {
    return (
        <div className="navigableLogo">
            <Link to="/homepage"><img height="5%" width="5%" src={logo} alt="placeholder_logo"/></Link>
        </div>
    );
}

export default NavigableLogo;
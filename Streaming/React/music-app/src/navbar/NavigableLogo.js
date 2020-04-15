import React from 'react';
import logo from './placeholder_logo.jpg';

function NavigableLogo() {
    return (
        <div className="navigableLogo">
            <img height="5%" width="5%" src={logo} onClick={sendToLogin} alt="placeholder_logo"/>
        </div>
    );
}

function sendToLogin() {
    window.location.href="/login";
}

export default NavigableLogo;
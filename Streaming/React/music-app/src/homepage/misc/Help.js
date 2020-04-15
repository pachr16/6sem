import React from 'react';

function Help() {
    const style = { "text-align": "center" };

    return(
        <div>
            <h2 style={style}>
                This page is not supported during this stage of development.
            </h2>
            <h2 style={style}>
                It might contain things like a phone number or email for support in the future.
            </h2>
        </div>
    );
}

export default Help;
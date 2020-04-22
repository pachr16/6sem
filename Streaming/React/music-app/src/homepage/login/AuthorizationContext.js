import React, { useState, createContext } from 'react';

export const AuthorizationContext = createContext();

export const AuthorizationProvider = (props) => {
    const [loggedID, setLoggedID] = useState("-1");
    

    return (
        <AuthorizationContext.Provider value={[loggedID, setLoggedID]}>
            {props.children}
        </AuthorizationContext.Provider>
    );
}
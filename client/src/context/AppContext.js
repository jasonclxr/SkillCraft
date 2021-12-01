import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = props => {

    const [] = useState([]);
    const [] = useState(null);

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    );
};

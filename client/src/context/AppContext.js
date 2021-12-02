import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = props => {

    const [selectedSkills, setSelectedSkills] = useState({ combat: [], sign: [], alchemy: [], general: [] });

    return (
        <AppContext.Provider value={{ selectedSkills, setSelectedSkills }}>
            {props.children}
        </AppContext.Provider>
    );
};

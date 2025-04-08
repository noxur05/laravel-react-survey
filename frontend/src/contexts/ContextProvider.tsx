import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {}
});

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState(null);

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const userStateContext = () => useContext(StateContext);
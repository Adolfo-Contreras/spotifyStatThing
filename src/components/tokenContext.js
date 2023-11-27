import React, { useState, useEffect, createContext } from 'react';

const tokenContext = createContext();

export const tokenProvider = ({children})=>{
    const [apiAuth, setapiAuth] = useState('');
    
    return(
        <>
            <tokenContext.Provider value={{ accessToken, setAccessToken }}>
                {children}
            </tokenContext.Provider>
        </>
    )
}
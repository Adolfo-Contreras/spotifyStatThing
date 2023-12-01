"use client";
import React, { useState, createContext, useContext } from 'react';
const tokenContext = createContext();
export const TokenProvider = ({children})=>{
    const [accessToken, setAccessToken] = useState(null);
    const setToken = (token)=>{
        setAccessToken(token)
    }
    return(
        <>
            <tokenContext.Provider value={{accessToken, setToken}}>
                {children}
            </tokenContext.Provider>
        </>
    )
      };
export const useToken = () => {
        const context = useContext(tokenContext);
        if (!context) {
          throw new Error('use the useToken thing');
        }
        return context;
    }
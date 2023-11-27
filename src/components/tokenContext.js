import React, { useState, useEffect, createContext, useContext } from 'react';

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
      };
      
      
export const useToken = () => {
        const context = useContext(tokenContext);
        if (!context) {
          throw new Error('use the useToken thing');
        }
        return context;
    }
// import React, { useState, useEffect, createContext, useContext } from 'react';

// const tokenContext = createContext();

// export const TokenProvider = ({children})=>{
//     const [apiAuth, setapiAuth] = useState("");
    
//     return(
//         <>
//             <tokenContext.Provider value={{ apiAuth, setapiAuth }}>
//                 {children}
//             </tokenContext.Provider>
//         </>
//     )
//       };
      
      
// export const useToken = () => {
//         const context = useContext(tokenContext);
//         if (!context) {
//           throw new Error('use the useToken thing');
//         }
//         return context;
//     }
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
            <tokenContext.Provider value={{accessToken, setAccessToken}}>
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
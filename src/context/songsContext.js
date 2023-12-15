"use client";
import React, { useState, createContext, useContext } from 'react';
const songContext = createContext();
export const SongsProvider = ({children})=>{
    const [selectedSongs, setSelectedSongs] = useState([]);
    return(
        <>
            <songContext.Provider value={{selectedSongs, setSelectedSongs}}>
                {children}
            </songContext.Provider>
        </>
    )
      };
export const useSongs = () => {
        const context = useContext(songContext);
        if (!context) {
          throw new Error('use the useToken thing');
        }
        return context;
    }
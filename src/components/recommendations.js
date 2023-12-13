import { useToken } from '@/context/tokenContext';
import React, { useState, useEffect } from 'react';

const {accessToken} = useToken();

export const Get5Recommendations = async ()=>{
    useEffect(() => {
    if(accessToken) {
         fetch('https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA'), {
  headers: {
    'Authorization': `Bearer ${accessToken}` 
  }}}
       
  
    }, [accessToken]);
} 
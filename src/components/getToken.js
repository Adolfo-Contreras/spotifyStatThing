import { useState, useEffect } from 'react';


const tokenRefresh = ()=>{
  // const [apiAuth, setapiAuth] = useState('');

  useEffect(() => {
    const clientId = '648cb720a9514f6a8f0ca2d0fcb802c8';
    const clientSecret = '1cd72998b404422882cb8e51123f0425'

    const getToken = async ()=>{
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const tokenData = await response.json();
        setapiAuth(tokenData.access_token);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      getToken()
      const intervalId = setInterval(() => {
        getToken();
      }, 60 * 60 * 1000);
    }
    return () => clearInterval(intervalId);
  }, []);
}


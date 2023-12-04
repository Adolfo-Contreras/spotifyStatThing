import { useState, useEffect, useContext } from 'react';
import { useToken } from '../../context/tokenContext';


const TokenRefresh = ()=>{
  // const [apiAuth, setapiAuth] = useState('');
  const [apiAuth, setapiAuth] = useContext(useToken);
  useEffect(() => {
    const url = 'https://accounts.spotify.com/api/token'
    const clientId = '648cb720a9514f6a8f0ca2d0fcb802c8';
    const clientSecret = '1cd72998b404422882cb8e51123f0425'

    const getToken = async ()=>{
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
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
      console.log(getToken())
      console.log()
    //   const interv = setInterval(() => {
    //     getToken();
    //   }, 60 * 60 * 1000);
    //   interv()
    // }
    // return () => clearInterval(interv);
}}, []);
}

export default TokenRefresh;
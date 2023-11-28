import { useEffect } from 'react';
import { useToken } from './tokenContext';


 const TokenRefresh = ()=>{
  // const [apiAuth, setapiAuth] = useState('');
  const {apiAuth, setapiAuth} = useToken();

  useEffect(() => {
    const clientId = '648cb720a9514f6a8f0ca2d0fcb802c8';
    const clientSecret = '1cd72998b404422882cb8e51123f0425';
    const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    const getToken= async ()=>{
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
        console.log(apiAuth)
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      getToken()
      // const ligma = setInterval(() => {
      //   getToken();
      // },1 * 1000 * 60 * 60);
    }
  }, []);

  return (
    <>
      <p>My Token: {apiAuth}</p>
    </>
  )
}

export default TokenRefresh;
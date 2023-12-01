// import React from 'react';
import React, { useState, useEffect } from 'react';


const { useToken } = require("./idk/tokenContext");

// export function UserProfile(){
//     return(
//         <>
//             <main>
//                 <section>
//                     <h1></h1>
//                 </section>
//             </main>
//         </>
//     )
// }

export const ExampleArtist= ()=>{
    // const response = await fetch('https://api.spotify.com/v1/me', {
    //     headers: {
    //       Authorization: 'Bearer BQBNoksuW3IlLchfDpyZhdjomrp88RLZq2EEElsnJ6gbqSZ93JQDOcudWtzFoHzAKli8GOv88232B_srhvwxSme5v_Tl0DaU2EDwxrUvpp9kIg_8leE'
    //     }
    //   });
    
    //   const data = await response.json();
    //   console.log(data)
    //   return data
    const {accessToken, setToken} = useToken();
    console.log(accessToken)
    const [myData, setmyData] = useState(null);
    useEffect(() => {

      if (accessToken) {
       fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
  headers: {
    'Authorization': `Bearer ${accessToken}` 
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    setmyData(data)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });  
      }
    }, [accessToken]);

    return(
      <>
        <div>
        {myData ? (
          <p>myData</p>
        ):(
          <p>loading...</p>
        )}
          {/* <p>{myData}</p> */}
        </div>
      </>
    )
    };
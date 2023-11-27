// import React from 'react';

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

async function profile(){
    // const response = await fetch('https://api.spotify.com/v1/me', {
    //     headers: {
    //       Authorization: 'Bearer BQBNoksuW3IlLchfDpyZhdjomrp88RLZq2EEElsnJ6gbqSZ93JQDOcudWtzFoHzAKli8GOv88232B_srhvwxSme5v_Tl0DaU2EDwxrUvpp9kIg_8leE'
    //     }
    //   });
    
    //   const data = await response.json();
    //   console.log(data)
    //   return data
    fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
  headers: {
    'Authorization': `Bearer ` 
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data here
    console.log(data);
  })
  .catch(error => {
    // Handle errors here
    console.error('There was a problem with the fetch operation:', error);
  });
    }
    profile()
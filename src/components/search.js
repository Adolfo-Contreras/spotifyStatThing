import {useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

const clientID = "d7c0438d174b4460ae3c0935f30dd541";
const clientSecret = "42396c3d643941c7a35ccdaefc3877b7";

function SearchF() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])
  console.log(accessToken);
  async function search() {
    console.log("Searching for " + searchInput); // Taylor Swift

    //Get request using search to get the Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => { return data.artists.items[0].id })

    console.log("Artist ID is " + artistID);
    //Get request with Artist ID grab all the albums from that artist
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setAlbums(data.items);
    });
    //Display those albums to the user
  }
  // console.log(albums);
    
    return (
        <div className="container p-2">
            <div className="my-2">
                <input
                className=" border-[#e5e7eb] border-2 rounded p-0.5 mr-2"
                placeholder="Search for Artist"
                type="input"
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        search();
                    }
                }}
                onChange={event => setSearchInput(event.target.value)}>
                </input>
                <button className=" bg-sky-700 border shadow-inner shadow-sky-400 rounded-lg p-0.5 px-1" onClick={search}>
                    Search
                </button>
            </div>

            <div>
                {/* {console.log(albums)} */}
                <div className="grid grid-cols-4 gap-4">
                {albums.map( (album, i) => {
                    // console.log(album);
                    return(
                        <div className="border-2 p-3 rounded">
                            <img src={album.images[0].url}></img>
                            <div className="text-center">
                                <p>{album.name}</p>
                            </div>
                        </div>
                    )
                })}

                </div>
            </div>
        </div>
    //   <div className="App">
    //     <Container>
    //       <InputGroup className="mb-3" size="lg">
    //         <FormControl
    //           placeholder="Search For Artist"
    //           type="input"
    //           onKeyDown={event => {
    //             if (event.key === "Enter") {
    //               search();
    //             }
    //           }}
    //           onChange={event => setSearchInput(event.target.value)}
    //         />
    //         <Button onClick={search}>
    //           Search
    //         </Button>
    //       </InputGroup>

    //     </Container>
    //     <Container>
    //       <Row className="mx-2 row row-cols-4">
    //         {albums.map( (album, i) => {
    //           console.log(album);
    //           return(
    //             <Card className="pt-2">
    //               <Card.Img src={album.images[0].url}/>
    //               <Card.Body>
    //                 <Card.Title>{album.name}</Card.Title>
    //               </Card.Body>
    //             </Card>
    //           )
    //         })}
    //       </Row>
    //     </Container>
    //   </div>
    )
}

export default SearchF;

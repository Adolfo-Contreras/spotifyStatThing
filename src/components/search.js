"use client";
import {useState, useEffect } from "react";
import { useToken } from "./idk/tokenContext";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

const clientID = "d7c0438d174b4460ae3c0935f30dd541";
const clientSecret = "42396c3d643941c7a35ccdaefc3877b7";

function SearchF() {
  const [searchInput, setSearchInput] = useState("");
  
  const {accessToken, setAccessToken} = useToken();
  const [artistId, setArtistId] = useState("");

  const [albums, setAlbums] = useState([]);

  const [numOfAlbums, setNumOfAlbums] = useState(0);
  const [albumID, setAlbumID] = useState("");

  const [singles ,setSingles] = useState([]);
  const [numOfSingles, setNumOfSingles] = useState(0); 

  const [tracks, setTracks] = useState([]);
  const [numOfTracks, setNumOfTracks] = useState(0);

  const [selectedSongs, setSelectedSongs] = ([]);

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //GRABS ALL ALBUMS
  useEffect(() => {
    // console.log('# of albums',numOfAlbums);

    const rerun = Math.ceil(numOfAlbums / 50);

    const albumsAgain = async (offset, artistId) => {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
              }
        }
        const response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50&offset=' + offset, searchParameters);

        const data = await response.json();
        
        // console.log('data',data);
        setAlbums(prevAlbums => [...prevAlbums, ...data.items]);
    };

    const runAsyncFunction = async (artistId) => {
        for (let i = 1; i < rerun; i++) {
          const offset = i * 50;
          await albumsAgain(offset, artistId);
        }
      };
  
    runAsyncFunction(artistId);
  }, [numOfAlbums, artistId]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //GRABS ALL TRACKS FROM AN ALBUM
  useEffect(() => {
    // console.log('# of tracks',numOfTracks);
    console.log("tracks: ", tracks);
    console.log("selected: ", selectedSongs);
    const rerun = Math.ceil(numOfTracks / 50);

    const tracksAgain = async (offset, albumID) => {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
              }
        }
        const response = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/tracks?market=US&limit=50&offset=' + offset, searchParameters)
        
        const data = await response.json();
        
        // console.log('data: ', data);
        setTracks(prevTracks => [...prevTracks, ...data.items]);
    };

    const runAsyncFunction = async (albumID) => {
        for (let i = 1; i < rerun; i++) {
          const offset = i * 50;
          await tracksAgain(offset, albumID);
        }
      };
  
    runAsyncFunction(albumID);

  },[numOfTracks,albumID]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //GRABS ALL SINGLES
  useEffect(() => {
    // console.log('# of singles',numOfSingles);

    const rerun = Math.ceil(numOfSingles / 50);

    const singlesAgain = async (offset, artistId) => {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
              }
        }
        const response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=single&market=US&limit=50&offset=' + offset, searchParameters);

        const data = await response.json();
        
        // console.log('data',data);
        setSingles(prevSingles => [...prevSingles, ...data.items]);
    };

    const runAsyncFunction = async (artistId) => {
        for (let i = 1; i < rerun; i++) {
          const offset = i * 50;
          await singlesAgain(offset, artistId);
        }
      };
  
    runAsyncFunction(artistId);
  }, [numOfSingles, artistId]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  async function search() {
    setTracks([]);
    // console.log("Test",tracks);
    // console.log("tracks: ", tracks);
    if (searchInput === '') return;
    console.log("Searching for " + searchInput); // Taylor Swift
    
    //used for pretty much anything involving the spotify API
    var searchParameters = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
    }

    //////////////////////////////////

    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => { 
        setArtistId(data.artists.items[0].id)
        return data.artists.items[0].id 
    })
    
    console.log("Artist ID is " + artistID);
    
    //////////////////////////////////

    //uses artist id to find their albums (but only finds first 50)
    const returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setNumOfAlbums(data.total)    
      setAlbums(data.items);
    });

    //////////////////////////////////
    
    //uses artist id to find their singles (but only finds first 50)
    const returnedSingles = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=single&market=US&limit=50&offset=0', searchParameters)
    .then(response => response.json())
    .then(data => {
        setNumOfSingles(data.total)
        setSingles(data.items);
    })
  }

  //finds all the songs in the album
  async function searchAlbums(id) {
    console.log('album: ', id);
    
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    
    const returnedAlbumTracks = await fetch('https://api.spotify.com/v1/albums/' + id + '/tracks?market=US&limit=50&offset=0', searchParameters)
    .then(response => response.json())
    .then(data => {
        // console.log(data.items);
        setNumOfTracks(data.total)
        setTracks(data.items)
        setAlbumID(id)
    })
  }

  // adds them to the list
  async function list(track) {
    console.log(track.name);
    // setSelectedSongs(...selectedSongs, track.name)

  }

    return (
    <div className=" w-full p-2">
        <div className="my-2"> {/*search */}
            <input
            className=" border-[#e5e7eb] border-2 rounded p-0.5 mr-2"
            placeholder="Search for Artist"
            type="input"
            onKeyDown={event => {
                if (event.key === "Enter") {
                    search();
                }
            }}
            onChange={event => setSearchInput(event.target.value.trim())}>
            </input>
            <button className=" bg-sky-500 border shadow-inner shadow-sky-400 rounded-lg p-0.5 px-1 text-center leading-tight" onClick={search}>
                Search
            </button>
        </div>
            
        <div>
            <div className="flex">
                <div className="w-1/2">
                    <h1>SONGS FROM CLICKED ALBUM</h1>
                    <ul >
                        {tracks.map( (track, i) => {
                            // console.log(track);
                            return(
                                <li key={`${track.name}-${track.id}`} onClick={() => list(track)} >{i+1}. {track.name}</li>
                                )
                            })}
                    </ul>
                </div>
                <div className="w-1/2">
                    <h1>SONGS YOU SELECTED</h1>
                    <ul>
                        {/* {console.log(selectedSongs)} */}
                        {/* {tracks.map( (song, i) => {
                            return(
                                <li>{i+1}. {song.name}</li>
                                )
                            })} */}
                    </ul>
                </div>
            </div>
            <br></br><br></br><br></br><br></br>
            <h1>Albums</h1>
            <div className="grid grid-cols-4 gap-4">
                {albums.map( (album, i) => {
                    // console.log(album);
                    {/* className=" w-[432px] h-[432px]" */}
                    return(
                        <div key={`${album.name}-${album.id}`} className="border-2 p-3.5 rounded-md" onClick={() => searchAlbums(album.id)}>
                            <img className=" " src={album.images[0].url}></img>
                            <div className="text-center ">
                                <p className=" my-1">{album.name}</p>
                            </div>
                        </div>
                    )
                })}
             </div>
            

            <br></br><br></br><br></br><br></br><br></br><br></br>
            
            <h1 className="">Singles</h1>
            <div className="grid grid-cols-4 gap-4">
                {/* {console.log('# of singles',numOfSingles)} */}
                {singles.map( (single, i) => {
                    // console.log(album);
                    return(
                        <div key={`${single.name}-${single.id}`} className="border-2 p-3.5 rounded-md">
                            <img className=" " src={single.images[0].url}></img>
                            <div className="text-center ">
                                <p className=" my-1">{single.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default SearchF;
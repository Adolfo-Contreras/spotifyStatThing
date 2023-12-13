"use client";
import {useState, useEffect } from "react";
import { useToken } from "../context/tokenContext";

const clientID = "d7c0438d174b4460ae3c0935f30dd541";
const clientSecret = "42396c3d643941c7a35ccdaefc3877b7";

function SearchF() {
  const [searchInput, setSearchInput] = useState("");
  
  const {accessToken, setAccessToken} = useToken();
  // used for spotify api
  const searchParameters = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
  }
  const [artistId, setArtistId] = useState("");
  const [listArtists, setListArtists] = useState([]);

  const [albums, setAlbums] = useState([]);
  const [numOfAlbums, setNumOfAlbums] = useState(0);
  const [albumID, setAlbumID] = useState("");

  const [singles, setSingles] = useState([]);
  const [numOfSingles, setNumOfSingles] = useState(0); 

  const [tracks, setTracks] = useState([]);
  const [numOfTracks, setNumOfTracks] = useState(0);

  const [selectedSongs, setSelectedSongs] = useState([]);

  // grabs a token to use spotify api
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

  //GRABS ALL ALBUMS AND SINGLES
  useEffect(() => {
      const albumsAgain = async (offset, artistId, includeGroups, setItems, numOfItems) => {
          const response = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=' + includeGroups + '&market=US&limit=50&offset=' + offset, searchParameters);
        const data = await response.json();
        setItems(prevItems => [...prevItems, ...data.items]);
    };
    
    const runAsyncFunction = async (artistId, includeGroups, numOfItems) => {
        const rerun = Math.ceil(numOfItems / 50);
        for (let i = 1; i < rerun; i++) {
            const offset = i * 50;
            await albumsAgain(offset, artistId, includeGroups, includeGroups === 'single' ? setSingles : setAlbums, numOfItems);
        }
    };
    
    runAsyncFunction(artistId, 'single', numOfSingles);
    runAsyncFunction(artistId, 'album', numOfAlbums);
    console.log("albums: ", albums);
    console.log("singles: ", singles);
}, [numOfSingles, numOfAlbums, artistId]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //GRABS ALL TRACKS FROM AN ALBUM AND SINGLES
  useEffect(() => {
    // console.log('# of tracks',numOfTracks);
    console.log("tracks: ", tracks);
    console.log("selected: ", selectedSongs);
    const rerun = Math.ceil(numOfTracks / 50);

    const tracksAgain = async (offset, albumID) => {
        const response = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/tracks?market=US&limit=50&offset=' + offset, searchParameters)
        const data = await response.json();
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

  //searches 10 top artists
  async function searchArtist() {
    setTracks([]);
    console.log("Searching for " + searchInput); // Taylor Swift

    if (searchInput === '') return;

    const artistList = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist&limit=10', searchParameters)
    .then(response => response.json())
    .then(data => { 
        setListArtists(data.artists.items)
    })
  }
  //gets data from artist you clicked
  async function getArtistData(artistID) {
    setListArtists([])
    setArtistId(artistID)
    console.log("Artist ID is " + artistID);

    //uses artist id to find their albums
    const returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log("artist album data: ", data);
      setNumOfAlbums(data.total)    
      setAlbums(data.items);
    });
    
    //uses artist id to find their singles
    const returnedSingles = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=single&market=US&limit=50&offset=0', searchParameters)
    .then(response => response.json())
    .then(data => {
        console.log("artist single data: ", data);
        setNumOfSingles(data.total)
        setSingles(data.items);
    })
  }
  //finds all the songs in the album/single
  async function searchAlbums(id) {
    // console.log('album: ', id);

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
    console.log("song-name: ",track.name);
    console.log(selectedSongs);
    if(selectedSongs.includes(track.name)){
        console.log('this song is already inside');
        return;
    } else {
        setSelectedSongs(old => [...old, track.name])
    }
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
                    searchArtist();
                }
            }}
            onChange={event => setSearchInput(event.target.value.trim())}>
            </input>
            <button className=" bg-sky-500 border shadow-inner shadow-sky-400 rounded-lg p-0.5 px-1 text-center leading-tight" onClick={searchArtist}>
                Search
            </button>
        </div>
        <div> {/* this is the list that will be generated when you search an artist */}
            <ul>
                {listArtists.map( (artist, i ) => {
                    // console.log(artist.name);
                    return(
                        <li key={i+1} onClick={() => getArtistData(artist.id)}>{i+1}. {artist.name}</li>
                    )
                })}
            </ul>
        </div>
        <br></br>
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
                        {selectedSongs.map( (song, i) => {
                            return(
                                <li key={`${song}`}>{song}</li>
                            )
                        })}
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
                        <div key={`${single.name}-${single.id}`} className="border-2 p-3.5 rounded-md" onClick={() => searchAlbums(single.id)}>
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
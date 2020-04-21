import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';
import { MetaContext } from './browser/MetaContext.js';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './browser/SingleSong.js';
import Help from './misc/Help.js';
import About from './misc/About.js';




function Homepage() {
  const [titles, setTitles, songDurations, setSongDurations, song_urls, setSong_urls, sizes, setSizes, albums, setAlbums, artists, setArtists, arts, setArts] = useContext(MetaContext);

  useEffect(loadMetaData, []);  // called when the component is mounted (which, unfortunately, is also when re-rendered)

  function loadMetaData() {
    const url = "http://localhost:2000";
    const socket = socketClient.connect(url);

    ss(socket).emit('getMetaData', 'thisdoesntmatter', () => {
      console.log("We've requested metadata!");
    });

    ss(socket).on('metadata', (info) => {
      console.log("Waiting for data");
      console.log("Got this song: " + info.buffer.title);

      setTitles(titles.push(info.buffer.title));
      console.log(titles);
      setSongDurations(songDurations.push(info.buffer.duration));
      setSong_urls(song_urls.push(info.buffer.song_url));
      setSizes(sizes.push(info.buffer.size));
      setAlbums(albums.push(info.buffer.album));
      setArtists(artists.push(info.buffer.artist));

      // setting the album art requires some formatting stuff
      var tempImage = new Image();
      tempImage.src = 'data:image/png;base64,' + info.buffer.image;
      setArts(arts.push(tempImage.src));

      console.log("Successfully loaded this (and more!):");
      console.log("Titles: " + titles + "\n Albums: " + albums + "\n Artists: " + artists);

      //document.body.appendChild(playImage);   // this might be useful if we want one component for all songcards
    });
  }


  //const songcards = titles.map(song => <SingleSong />);

  return (
    <div>
      <Switch>
        <Route exact path="/createNewUser">
          <CreateNewUser />
        </Route>

        <Route exact path="/homepage">
          {/*songcards
          
          Lidt et problem at vi re-renderer det her component hele tiden, grundet at state ændres når vi loader
           - overvejer at kigge på om det kan fixes ved at lave det med Redux i stedet */}
          <SingleSong />
        </Route>

        <Route exact path="/login">    {/** checks from top to bottom; if we dont use exact path, this one will be shown in cases of 404 - and if it was first, we could never reach any other paths */}
          <Login />
        </Route>

        <Route exact path="/help">
          <Help />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/">
          <Login />
        </Route>

        {/* add routes to new components here */}

      </Switch>
    </div>
  );
}
export default Homepage;
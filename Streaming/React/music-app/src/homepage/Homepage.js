import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './browser/SingleSong.js';
import Help from './misc/Help.js';
import About from './misc/About.js';
import { useSelector, useDispatch } from 'react-redux';
import { addTitle, addSongDur, addSong_url, addSize, addAlbum, addArtist, addArt } from '../redux/actions.js';
import SongOverview from './browser/SongOverview.js';



function Homepage() {
  // these three are only used for testing, should be removed from here
  const titles = useSelector(state => state.titles);
  const albums = useSelector(state => state.albums);
  const artists = useSelector(state => state.artists);


  // this one is needed for running actions on our state
  const dispatch = useDispatch();

  // called when the component is mounted (which is also when re-rendered)
  // means metadata for songs is loaded when homepage component is rendered, maybe should move it somewhere else
  useEffect(loadMetaData, []);

  function loadMetaData() {
    const url = "http://localhost:2000";
    const socket = socketClient.connect(url);

    ss(socket).emit('getMetaData', 'thisdoesntmatter', () => {
      console.log("We've requested metadata!");
    });

    ss(socket).on('metadata', (info) => {
      console.log("Waiting for data");
      console.log("Got this song: " + info.buffer.title);

      dispatch(addTitle(info.buffer.title));
      console.log(titles);

      dispatch(addSongDur(info.buffer.duration));
      dispatch(addSong_url(info.buffer.song_url));
      dispatch(addSize(info.buffer.size));
      dispatch(addAlbum(info.buffer.album));
      dispatch(addArtist(info.buffer.artist));
      // setting the album art requires some formatting stuff
      var tempImage = new Image();
      tempImage.src = 'data:image/png;base64,' + info.buffer.image;
      dispatch(addArt(tempImage.src));

      //console.log("Successfully loaded this (and more!):");
      //console.log("Titles: " + titles + "\n Albums: " + albums + "\n Artists: " + artists);
    });
  }

  return (
    <div>
      <Switch>
        <Route exact path="/createNewUser">
          <CreateNewUser />
        </Route>

        <Route exact path="/homepage">
          <SongOverview />


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
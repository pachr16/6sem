import React, { useState, useContext } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthorizationContext } from './login/AuthorizationContext';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './browser/SingleSong.js';
import Help from './misc/Help.js';
import About from './misc/About.js';
import NotFound from './misc/NotFound.js';
import AccountSettings from './misc/AccountSettings';



function Homepage() {
  const [loggedID, setLoggedID] = useContext(AuthorizationContext);
  const [songs, setSongs] = useState([
    {
      song_id: 1,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      song_id: 2,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    }
  ]);

  const songsid = () => {
    fetch('http://localhost:2000/getMetaData').then(
      (response) => {
        if (response.ok) {
          setSongs(response.json());
          console.log(songs);
        } else {
          console.log(response.status);
        }
      }
    );
  }

  const songcards = songs.map(song => <SingleSong key={song.song_id} data={song} />)



  function requireAuth(destination) {
    if (loggedID == -1) {
      return <Login />
    }
    return destination;
  }


  return (
    <div>
      <Switch>
        <Route exact path="/createNewUser">
          <CreateNewUser />
        </Route>

        <Route exact path="/account">
          {requireAuth(<AccountSettings />)}
        </Route>

        {/*}
        <Route exact path="/login">
          <Login />
        </Route>
        {*/}

        <Route exact path="/" >
          {requireAuth(songcards)}
        </Route>

        <Route exact path="/help">
          <Help />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        {/* add routes to new components here */}





        {/* THIS ONE MUST BE LAST!! */}
        <Route path="/">
          <NotFound />
        </Route>

      </Switch>
    </div>
  );
}
export default Homepage;
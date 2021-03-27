import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from './util';
import "./styles/app.scss";


function App() {

  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])

  return (
    <div className="App">
          <Song currentSong={currentSong}/>
      <Player/>      
    </div>
  );
}

export default App;

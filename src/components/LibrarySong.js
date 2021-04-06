import React from "react";
import {playAudio} from '../util';

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {

    const songSelectHandler = () => {
        const selectedSong = songs.filter((each) => each.id === song.id);
        setCurrentSong(selectedSong[0]);
        const newSongs = songs.map((each) => {
            if(each.id === song.id){
                return {
                ...each,
                active:true,
                }; 
            } else {
                    return {
                        ...each,
                        active:false
                    };
                }            
        });
        setSongs(newSongs);
        playAudio(isPlaying , audioRef);
      
    }

   

    return(        
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
                <div className='song-description'>
                    <h3>{song.name}</h3>
                    <h4>{song.artist}</h4>
                </div>
        </div>
    )
}

export default LibrarySong;
/* eslint-disable @next/next/no-img-element */
import React from "react";

export type LibraryProps = {
    song?:any;
    songs:any;
    setCurrentSong:(value:any) => void;
    audioRef:any;
    isPlaying:boolean;
    setSongs:(value:any) => void;
    libraryStatus?:any;
    setLibraryStatus:(value:any) => void;

}

const LibrarySong:React.FC<LibraryProps> = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {

    const songSelectHandler = async () => {
        const selectedSong = songs.filter((each:any) => each.album_id === song.album_id);
        await setCurrentSong(selectedSong[0]);
        const newSongs = songs.map((each:any) => {
            if (each.id === song.id) {
                return {
                    ...each,
                    active: true,
                };
            } else {
                return {
                    ...each,
                    active: false
                };
            }
        });
        setSongs(newSongs);
        if (isPlaying) audioRef.current.play()

    }



    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.album_image} width={600}></img>
            <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist_name}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;
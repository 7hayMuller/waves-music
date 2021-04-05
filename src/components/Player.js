import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause    
} from "@fortawesome/free-solid-svg-icons";

const Player = ({isPlaying, setIsPlaying, setSongInfo, songInfo, audioRef, songs, setCurrentSong, currentSong}) => {
    

    const getTime = (time) => {
        return(
            Math.floor(time/60) + ":" + ("0"+ Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime:e.target.value
        })
    }


    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }    
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex+1) % songs.length])

        } if (direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1){
                setCurrentSong(songs[songs.length -1]);
                return;
            }
            setCurrentSong(songs[(currentIndex -1) % songs.length])
            
        }


    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler}/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" onClick={() => skipTrackHandler('skip-back')} />
                <FontAwesomeIcon onClick={playSongHandler}  className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x" onClick={() => skipTrackHandler('skip-forward')}/>
            </div>            
        </div>
    )
}
export default Player;
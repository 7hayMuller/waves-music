import React, { useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa6";

type PlayerProps = {	
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    setSongInfo: (value: any) => void;
    songInfo: any;
    audioRef: any;
    songs: any;
    setCurrentSong: (value: any) => void;
    currentSong: any;
    setSongs: (value: any) => void;
}

const Player: React.FC<PlayerProps> = ({	
	isPlaying,
	setIsPlaying,
	setSongInfo,
	songInfo,
	audioRef,
	songs,
	setCurrentSong,
	currentSong,
	setSongs,
}) => {
	const getTime = (time: any) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	const dragHandler = (e: any) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({
			...songInfo,
			currentTime: e.target.value,
		});
	};

	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const skipTrackHandler = async (direction: any) => {
		const currentIndex = songs.findIndex((song: any) => song.album_id === currentSong.album_id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				setCurrentSong(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	
	useEffect(() => {
		const newSongs = songs.map((each: any) => {
			if (each.album_id === currentSong.album_id) {
				return {
					...each,
					active: true,
				};
			} else {
				return {
					...each,
					active: false,
				};
			}
		});
		setSongs(newSongs);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSong]);

	
	useEffect(() => {
		if (currentSong && !isPlaying) {
			audioRef.current.play();
			setIsPlaying(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSong]);

	const trackAnim = {
		transform: `translateX(${songInfo.percentage}%)`,
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div className="track">
					<input
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
						onChange={dragHandler}
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
			</div>
			<div className="play-control">
				<FaAngleLeft
					className="skip-back"
					size={50}
					onClick={() => skipTrackHandler("skip-back")}
				/>
				{isPlaying ? (
					<FaPause onClick={playSongHandler} size={50}/>
				) : (
					<FaPlay onClick={playSongHandler} className="play" size={50} />
				)}				
				<FaAngleRight
					className="skip-forward"
					size={50}
					onClick={() => skipTrackHandler("skip-forward")}
				/>
			</div>
		</div>
	);
};

export default Player;

'use client'

import Library from "@/components/Library";
import Nav from "@/components/Nav";
import Player from "@/components/Player";
import Song from "@/components/Song";
import React, { useState, useRef, useEffect } from "react";

import '@/styles/app.scss'
import { fetchTracks } from "@/data";

export type Track = {
  album_id: string;
  album_name: string;
  artist_name: string;
  album_image: string;
  audio: string;
  duration: number;
};

const Home = () => {
	const [songs, setSongs] = useState<Track[]>([]);
	const [currentSong, setCurrentSong] = useState<Track | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState<string>('relaxing music');

	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		percentage: 0,
	});

	const audioRef = useRef<HTMLAudioElement>(null);

	const genres = [
		{ label: 'Relaxing', value: 'relaxing music' },
		{ label: 'Pop', value: 'pop' },
		{ label: 'Rock', value: 'rock' },
		{ label: 'Jazz', value: 'jazz' },
		// Adicione mais gêneros conforme necessário
	];

	const loadTracks = (genre: string) => {
		fetchTracks(genre).then((tracks: Track[]) => {
			setSongs(tracks);
			if (tracks.length > 0) {
				setCurrentSong(tracks[0]);
				setIsPlaying(true);
			}
		}).catch((error: any) => {
			console.error('Failed to load tracks:', error);
		});
	};

	useEffect(() => {
		loadTracks(selectedGenre);
	}, [selectedGenre]);

	useEffect(() => {
		if (currentSong && isPlaying) {
			audioRef.current?.play(); 
		}
	}, [currentSong, isPlaying]);

	const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
		const current = e.currentTarget.currentTime;
		const duration = e.currentTarget.duration;

		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			percentage,
		});
	};

	const songEndHandler = async () => {
		if (!songs.length) return;
		const currentIndex = songs.findIndex((song) => song.album_id === currentSong?.album_id);
		setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current?.play(); 
	};

	return (
		<div className={`App ${libraryStatus ? "library-active" : ""}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>	

			{currentSong && <Song currentSong={currentSong} />}

			<Player      
				setSongs={setSongs}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				audioRef={audioRef}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
			/>
			<Library
			    setLibraryStatus={setLibraryStatus}
				libraryStatus={libraryStatus}
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
			/>

			{currentSong && (
				<audio
					onLoadedMetadata={timeUpdateHandler}
					onTimeUpdate={timeUpdateHandler}
					ref={audioRef}
					src={currentSong.audio}
					onEnded={songEndHandler}
				></audio>
			)}
		</div>
	);
}

export default Home;

import React, { useRef, useEffect } from 'react';
import LibrarySong, { LibraryProps } from './LibrarySong';
import { FaWindowClose } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Library: React.FC<LibraryProps> = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, setLibraryStatus }) => {
    const libraryRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (libraryRef.current && !libraryRef.current.contains(event.target as Node)) {
            setLibraryStatus(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={libraryRef} className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <div className='library-header'>
            <h2>Library</h2>            
            <IoClose size={30} className='close-icon' onClick={() => setLibraryStatus(false)}/>
            </div>
            <div className='library-songs'>
                {songs.map((song: any) => (
                    <LibrarySong
                        setLibraryStatus={setLibraryStatus}
                        setSongs={setSongs}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;

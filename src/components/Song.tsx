/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const Song = ({ currentSong }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log('current', currentSong)

    const handleImageLoad = () => {       
        setIsLoading(false);        
    };

    return (
        <div className="song-container">
            {isLoading && (
                <div className="skeleton-loader"></div>
            )}
            <img
                alt={currentSong.album_name}
                src={currentSong.album_image}
                width={600}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;

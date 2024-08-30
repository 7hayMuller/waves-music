import React from 'react';
import { FaMusic } from 'react-icons/fa6';

type NavProps = {
    setLibraryStatus: (value: any) => void;
    libraryStatus: any;
    setSelectedGenre: (value: any) => void;
    selectedGenre: any;
    genres: any;
}

const Nav: React.FC<NavProps> = ({ setSelectedGenre, selectedGenre, genres, setLibraryStatus, libraryStatus }) => {
    return (
        <nav>
            <div className="nav-header">
                <h1>Waves</h1>
                <div className="genre-select">
                    <label htmlFor="genre">Select Genre:</label>
                    <select
                        id="genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        {genres.map((genre: any) => (
                            <option key={genre.value} value={genre.value}>
                                {genre.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={() => setLibraryStatus(!libraryStatus)} >
                    Library
                    <FaMusic style={{ marginLeft: 10 }} />               
                </button>
            </div>           
        </nav>
    );
}

export default Nav;

import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import SearchResults from './SearchResults';
import useMoviesFetch from './hooks/useMoviesFetch';

const baseUrl = "https://imdb-clone-backend-lemon.vercel.app"

const Header = () => {
    const { selectedMovies, width } = useContext(DataContext)
    const [searchResults, setSearchResults] = useState('')
    const [movies, setMovies] = useState([])
    const [isActive, setIsActive] = useState(false)

    const { data } = useMoviesFetch(`${baseUrl}/movies`, searchResults.length)

    useEffect(() => {
        setMovies(data)
        return () => {
            setMovies([])
        }
    }, [data])


    const handleSearch = (e) => {
        setSearchResults(e.target.value)
    }

    const count = selectedMovies ? selectedMovies.length : 0

    const filteredResults = movies.length ? movies.filter(movie => (movie.title).toLowerCase().startsWith(searchResults.toLowerCase())) : []

    return (
        <header className='header'>
            <div className="header-container">
                <NavLink
                    to='/movies/1'
                    className='nav-link'
                >
                    <div className="header-logo">Movies</div>
                </NavLink>
                <div className={width <= 600 && isActive ? "header-input-container input-sm" : "header-input-container"}>
                    {searchResults && (
                        <div className="search-results-container">
                            <ul className='search-ul'>
                                {filteredResults.map(movie => (
                                    <li
                                        key={movie.id}
                                        onClick={() => {
                                            setSearchResults('')
                                        }}
                                    >
                                        <Link className='nav-link' to={`/movies/movie/${movie.id}`}>
                                            <SearchResults {...movie} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <input
                        value={searchResults}
                        onChange={(e) => {
                            handleSearch(e)
                        }}
                        type="text"
                        placeholder='Search for a movie'
                        className={width <= 600 && isActive ? 'header-input block' : 'header-input'}
                    />
                    {isActive && width <= 600
                        ?
                        <IoMdClose
                            onClick={() => {
                                setIsActive(false)
                            }}
                            className='header-close-btn'
                        />
                        :
                        <CiSearch
                            onClick={() => {
                                width <= 600 && setIsActive(true)
                            }}
                            className='header-search-icon'
                        />

                    }

                </div>
                <NavLink to='/movies/watchlist' className='nav-link white'>
                    <div className="header-watchlist-container">
                        <CiBookmarkPlus className='header-watchlist-icon' />
                        <h1 className='header-watchlist-text'>Wathclist</h1>
                        <span className='header-watchlist-count'>{count}</span>
                    </div>
                </NavLink>
            </div>
        </header>
    )
}

export default Header

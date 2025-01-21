import React, { memo, useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { DataContext, DataContextHandlers } from './context/DataContext';
import { Link } from 'react-router-dom';

const MovieCard = ({
    handleIsInfoOpen,
    handleClickedId,
    movie,
}) => {
    const {
        id,
        title,
        img,
        alt,
        date,
        rate
    } = { ...movie }
    const { width, selectedMovies, fetchWatchlistError, isWatchlistLoading } = useContext(DataContext)
    const { handleAddToWatchlist, handleDeleteFromWatchlist } = useContext(DataContextHandlers)

    const handleInfoClick = () => {
        handleIsInfoOpen()
        handleClickedId(id)
    }

    const selected = selectedMovies.map(movie => movie.id).includes(id)

    return (
        <>
            <div className="card-image-container">
                <Link
                    className='nav-link'
                    to={`/movies/movie/${id}`}
                >
                    <img
                        className='card-image'
                        src={img}
                        alt={alt} />
                </Link>
            </div>
            <ul className="details">
                <div className="details-top">
                    <li className="top-container">
                        <div className="rate-container">
                            <span><FaStar className='star-icon' /></span>
                            <span className='rate'>{rate.toFixed(1)}</span>
                        </div>
                        <span className='card-date'>{date}</span>
                    </li>
                    <Link className='nav-link' to={`/movies/movie/${id}`}>
                        <li

                            className="card-title-container">
                            {width >= 700 && title.slice(0, 25) + (title.length >= 25 ? '...' : '')}
                            {width < 700 && title.slice(0, 20) + (title.length >= 20 ? '...' : '')}
                        </li>
                    </Link>
                </div>


                <div className="details-bottom">
                    {!isWatchlistLoading && fetchWatchlistError &&
                        <div className="statusMsg-container">
                            <p className='err'>Failed to load watchlist</p>
                        </div>
                    }
                    {!fetchWatchlistError &&
                        <li
                            onClick={() => {
                                selected
                                    ? handleDeleteFromWatchlist(id)
                                    : handleAddToWatchlist(movie)
                            }}
                            className="info-watchlist-container"
                        >
                            {selected
                                ? <span className='checked'><FaCheck /></span>
                                : <span className='plus'><FaPlus /></span>}
                            <span>Watchlist</span>
                        </li>}
                    <li className="card-bottom-container">
                        <div className="card-trailer-container">
                            <span><FaPlay className='play-icon' /></span>
                            <Link className='nav-link' to={`/movies/trailer/${id}`}>
                                <span>Trailer</span>
                            </Link>
                        </div>
                        <span>
                            <CiCircleInfo
                                className='info-icon'
                                onClick={handleInfoClick}
                            />
                        </span>
                    </li>
                </div>
            </ul>
        </>
    )
}

export default memo(MovieCard)

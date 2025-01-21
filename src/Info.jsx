import React, { useContext } from 'react'
import { MdNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { DataContext, DataContextHandlers } from './context/DataContext';
import { Link } from 'react-router-dom';


const Info = ({ handleIsInfoOpen, movies, id }) => {
    const { selectedMovies, fetchWatchlistError, isWatchlistLoading } = useContext(DataContext)
    const { handleDeleteFromWatchlist, handleAddToWatchlist } = useContext(DataContextHandlers)
    const movie = movies.find(movie => movie.id === id)
    const { title, img, alt, date, duration, rating, rate, synopsis, genreShort } = { ...movie }
    const selected = selectedMovies.map(movie => movie.id).includes(id)
    return (
        <article className='info'>
            <IoMdClose
                className='close-btn'
                onClick={handleIsInfoOpen}
            />
            <div className="info-top">
                <div className="info-details">
                    <div className="image-container">
                        <Link className='nav-link' to={`/movies/movie/${id}`}>
                            <img
                                className='info-image'
                                src={img}
                                alt={alt}
                            />
                        </Link>
                    </div>
                    <div className="details-container">
                        <h1 className='info-title-container'>
                            <Link className='nav-link' to={`/movies/movie/${id}`}>
                                <span className='info-title'>{title} </span>
                                <span><MdNavigateNext className='next-icon' /></span>
                            </Link>
                        </h1>
                        <div className="info-uls">
                            <ul>
                                <li key={date}>{date}</li>
                                <li key={duration}>{duration}min</li>
                                <li key={rating}>{rating}</li>
                            </ul>
                            <ul>
                                {genreShort.map(genre => (
                                    <li key={genre}>
                                        {genre}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rate-container">
                            <span><FaStar className='star-icon' /></span>
                            <span className='rate'>{rate.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                <p className='synopsis'>
                    {synopsis}
                </p>
            </div>
            <div className="info-bottom">
                {!isWatchlistLoading && fetchWatchlistError &&
                    <div className="statusMsg-container">
                        <p className='statusMsg err '>Failed to load watchlist</p>
                    </div>
                }
                {!fetchWatchlistError &&
                    <div
                        onClick={() => {
                            selected
                                ? handleDeleteFromWatchlist(id)
                                : handleAddToWatchlist(movie)
                        }}
                        className="info-watchlist-container">
                        {selected
                            ? <span className='checked'><FaCheck /></span>
                            : <span className='plus'><FaPlus /></span>}
                        <span>Watchlist</span>
                    </div >}
            </div>
        </article>
    )
}

export default Info

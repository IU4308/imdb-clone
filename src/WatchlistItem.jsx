import React, { useContext } from 'react'
import { MdNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { DataContextHandlers } from './context/DataContext';
import { Link } from 'react-router-dom';

const WatchlistItem = ({
    id,
    title,
    img,
    alt,
    date,
    duration,
    rating,
    genreShort,
    rate,
    synopsis,
    directors,
    stars
}) => {
    const { handleDeleteFromWatchlist } = useContext(DataContextHandlers)
    return (
        <>
            {title !== 'undefined' &&
                <>
                    <div className="info-details">
                        <IoMdClose
                            className='delete-btn'
                            onClick={() => {
                                handleDeleteFromWatchlist(id)
                            }}
                        />
                        <div className="image-container">
                            <Link className='nav-link' to={`/movies/movie/${id}`}>
                                <img className='info-image' src={img} alt={alt} />
                            </Link>
                        </div>
                        <div className="details-container">
                            <Link className='nav-link' to={`/movies/movie/${id}`}>
                                <h1 className='info-title-container'>
                                    <span className='info-title'>{title}&nbsp;</span>
                                    <span><MdNavigateNext className='next-icon' /></span>
                                </h1>
                            </Link>
                            <div className="info-uls">
                                <ul>
                                    <li>{date}</li>
                                    <li>{duration}min</li>
                                    <li>{rating}</li>
                                </ul>
                                <ul>
                                    {genreShort.map(genre => (
                                        <li key={genre}>{genre}</li>
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
                    <div className="creators">
                        <ul className='directors'>
                            <span className='bold'>Director</span>
                            {directors.map(director => (
                                <li key={director}>{director}</li>
                            ))}
                        </ul>
                        <ul className='stars'>
                            <span className='bold'>Stars</span>
                            {stars.map(star => (
                                <li key={star}>{star}</li>
                            ))}
                        </ul>
                    </div>
                </>}
        </>
    )
}

export default WatchlistItem

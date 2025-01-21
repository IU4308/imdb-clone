import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import { DataContext, DataContextHandlers } from './context/DataContext';
import useMoviesFetch from './hooks/useMoviesFetch';

const baseUrl = "https://imdb-clone-backend-lemon.vercel.app"

const MoviePage = () => {
    const { selectedMovies, fetchWatchlistError, isWatchlistLoading, width } = useContext(DataContext)
    const { handleAddToWatchlist, handleDeleteFromWatchlist } = useContext(DataContextHandlers)
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})

    const { data, fetchError, isLoading } = useMoviesFetch(`${baseUrl}/movies/${movieId}`)

    useEffect(() => {
        setMovie(data)
        return () => {
            setMovie([])
        }
    }, [data])

    const { id, title, img, alt, videoId, date, duration, rating, rate, synopsis, genreLong, directors, writers, stars } = { ...movie }

    const selected = selectedMovies.map(movie => movie.id).includes(id)

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            loop: 1
        }
    }
    return (
        <>
            {isLoading &&
                <div className="statusMsg-container">
                    <p className='statusMsg'>Loading...</p>
                </div>
            }
            {!isLoading && fetchError &&
                <div className="statusMsg-container">
                    <p className='statusMsg err'>{fetchError}</p>
                </div>
            }

            {movie.title &&
                <div className='movie-page'>

                    <div
                        style={{ backgroundImage: `url(${img})` }}
                        className="background"
                    >
                        <div className="blur"></div>
                    </div>
                    <div className="movie-container">

                        <div className="details-container">
                            <h1 className='info-title'>
                                {title}
                            </h1>
                            <div className="movie-details">
                                <div className="info-uls">
                                    <ul>
                                        <li>{date}</li>
                                        <li>{duration}&nbsp;min</li>
                                        <li>{rating}</li>
                                    </ul>
                                </div>
                                <div className="rate-container">
                                    <span><FaStar className='star-icon' /></span>
                                    <span>{rate.toFixed(1)}&nbsp;</span><span className='rate'>/&nbsp;10</span>
                                </div>
                            </div>
                        </div>
                        <div className="movie-media-container">
                            {width > 600 &&
                                <div className="movie-image-container">
                                    <img
                                        className='movie-image'
                                        src={img}
                                        alt={alt}
                                    />
                                </div>}
                            <YouTube
                                className='video'
                                videoId={videoId}
                                opts={opts}
                            />
                        </div>
                        <div className="movie-description-container">
                            {width <= 600 &&
                                <div className="movie-image-container">
                                    <img
                                        className='movie-image'
                                        src={img}
                                        alt={alt}
                                    />
                                </div>
                            }
                            <div className="movie-description-right">
                                <ul className="movie-tags">
                                    {genreLong.map(genre => (
                                        <li
                                            key={genre}
                                            className='movie-tag'
                                        >
                                            {genre}
                                        </li>
                                    ))}

                                </ul>
                                <p className='synopsis'>
                                    {synopsis}
                                </p>
                            </div>

                        </div>
                        <div className="movie-creators">
                            <ul className='movie-directors'>
                                <li>Director</li>
                                {directors.map(director => (
                                    <li key={director}>{director}</li>
                                ))}
                            </ul>

                            <ul className='Writers'>
                                <li>Writers</li>
                                {writers.map(writer => (
                                    <li key={writer}>{writer}</li>
                                ))}
                            </ul>

                            <ul className='Stars'>
                                <li>Stars</li>
                                {stars.map(star => (
                                    <li key={star}>{star}</li>
                                ))}
                            </ul>
                        </div>

                        {!isWatchlistLoading && fetchWatchlistError &&
                            <div className="statusMsg-container">
                                <p className='statusMsg err '>Failed to load watchlist</p>
                            </div>
                        }

                        {!fetchWatchlistError && <div
                            className="movie-watchlist-container"
                            onClick={() => {
                                selected
                                    ? handleDeleteFromWatchlist(id)
                                    : handleAddToWatchlist(movie)
                            }}
                        >

                            {selected
                                ? <span className='checked'><FaCheck /></span>
                                : <span className='plus'><FaPlus /></span>}
                            <span className='movie-btn-text'>Add to Watchlist</span>
                        </div >}
                    </div>
                </div>}

        </>
    )
}

export default MoviePage

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import useMoviesFetch from './hooks/useMoviesFetch';

const baseUrl = "https://imdb-clone-backend-lemon.vercel.app"

const TrailerPage = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})
    const { data, fetchError, isLoading } = useMoviesFetch(`${baseUrl}/movies/${movieId}`)

    useEffect(() => {
        setMovie(data)
        return () => {
            setMovie([])
        }
    }, [data])
    const { title, img, alt, videoId, date, rating, synopsis, genreShort } = { ...movie }
    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            loop: 0
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
                <div className='trailer-page'>
                    <div className="trailer-container">
                        <YouTube
                            className='trailer'
                            videoId={videoId}
                            opts={opts}
                        />
                        <div className="info-details">
                            <div className="trailer-details-top">
                                <div className="image-container">
                                    <Link className='nav-link' to={`/movies/movie/${movie.id}`}>
                                        <img
                                            className='info-image'
                                            src={img}
                                            alt={alt}
                                        />
                                    </Link>
                                </div>
                                <div className="details-container">
                                    <h1 className='info-title-container'>
                                        <Link className='nav-link' to={`/movies/movie/${movie.id}`}>
                                            <span className='info-title'>{title} </span>
                                            <span className='trailer-date'>&#40;{date}&#41;</span>
                                        </Link>
                                    </h1>
                                    <div className="info-uls">
                                        <ul>
                                            <li>{rating}</li>
                                            <li>&#124;</li>
                                            {genreShort.map((genre, i) => (
                                                <li key={genre}>
                                                    {`${genre} ${i === genreShort.length - 1 ? '' : ','}`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className='synopsis'>{synopsis}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default TrailerPage

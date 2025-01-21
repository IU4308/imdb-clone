import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import Info from './Info'
import { RemoveScroll } from 'react-remove-scroll';
import useMoviesFetch from './hooks/useMoviesFetch';
import Pagination from './Pagination';
import { metaFetch } from './metaFetch';
import { useParams } from 'react-router-dom';

const baseUrl = "https://imdb-clone-backend-lemon.vercel.app"

const lastpage = metaFetch(`${baseUrl}/meta`)

const Home = () => {
    const { pageId } = useParams()
    const [clickedId, setClickedId] = useState(null)
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [movies, setMovies] = useState([])

    const { data, fetchError, isLoading } = useMoviesFetch(`${baseUrl}/movies?page=${pageId}`)

    useEffect(() => {
        setMovies(data)
        return () => {
            setMovies([])
        }
    }, [data])

    const handleIsInfoOpen = () => {
        setIsInfoOpen(!isInfoOpen)
    }

    const handleClickedId = async (id) => {
        setClickedId(id)
    }


    return (
        <>
            {
                isInfoOpen && (
                    <RemoveScroll>
                        <div className="fixed-container">
                            <Info
                                id={clickedId}
                                handleIsInfoOpen={handleIsInfoOpen}
                                movies={movies}
                            />
                        </div>
                    </RemoveScroll>
                )
            }
            <div
                className={isInfoOpen ? 'home opace' : 'home'}
                onClick={() => {
                    isInfoOpen && setIsInfoOpen(false)
                }}
            >
                {!fetchError &&
                    <h1 className='home-title'>What to Watch</h1>}
                {isLoading && <p className='statusMsg'>Loading movies...</p>}
                {!isLoading && fetchError && <p className='statusMsg err'>{fetchError}</p>}
                {!isLoading && !fetchError &&
                    (<ul className='movie-card-list'>
                        {movies.map(movie => (
                            <li key={movie.id} className={isInfoOpen ? 'movie-card disabled' : 'movie-card'}>
                                <MovieCard
                                    movie={movie}
                                    handleClickedId={handleClickedId}
                                    handleIsInfoOpen={handleIsInfoOpen}
                                    image='/terrifier2016.jpg'
                                    disabled={isInfoOpen}
                                />
                            </li>
                        ))}
                    </ul>)}

                {!fetchError && !isLoading &&
                    <Pagination
                        limit={lastpage}
                    />
                }
            </div>
        </>
    )
}

export default Home

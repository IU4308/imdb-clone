import { createContext, useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import api from '../api/watchlist'
import useWatchlistFetch from "../hooks/useWatchlistFetch";
import useMetaFetch from "../hooks/useMetaFetch";

const baseUrl = "https://imdb-clone-backend-lemon.vercel.app"

export const DataContext = createContext(null)
export const DataContextHandlers = createContext(null)

export const DataProvider = ({ children }) => {
    const [selectedMovies, setSelectedMovies] = useState([])

    const { width } = useWindowSize();
    const { data, fetchWatchlistError, isWatchlistLoading } = useWatchlistFetch(`${baseUrl}/watchlist`)
    const { meta } = useMetaFetch(`${baseUrl}/meta`)

    useEffect(() => {
        setSelectedMovies(data)
        return () => {
            setSelectedMovies([])
        }
    }, [data])


    const handleAddToWatchlist = async (movie) => {
        try {
            await api.post(`/watchlist`, movie);

            setSelectedMovies(prevItems =>
                [
                    ...prevItems,
                    movie
                ]
            )

        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }

    const handleDeleteFromWatchlist = async (id) => {
        try {
            await api.delete(`/watchlist/${id}`);

            setSelectedMovies(prevItems =>
                prevItems.filter(item => item.id !== id)
            )

        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }

    return (
        <DataContext.Provider value={{
            selectedMovies,
            isWatchlistLoading,
            fetchWatchlistError,
            width,
            meta
        }}>
            <DataContextHandlers.Provider value={{
                handleAddToWatchlist,
                handleDeleteFromWatchlist,
            }}>
                {children}
            </DataContextHandlers.Provider>
        </DataContext.Provider>
    )
}

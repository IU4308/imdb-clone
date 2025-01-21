import React, { useContext, useEffect, useState } from 'react'
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import WatchlistItem from './WatchlistItem';
import { DataContext } from './context/DataContext';

const dateSort = (arr) => {
    const nextArr = [...arr]
    return nextArr.sort((a, b) => b.date - a.date)

}

const alphabeticalSort = (arr) => {
    const nextArr = [...arr]
    return nextArr.sort((a, b) => b.title.localeCompare(a.title))
}

const Watchlist = () => {
    const { selectedMovies } = useContext(DataContext)
    const [sortOrder, setSortOrder] = useState('list')
    const [isDescending, setIsDescending] = useState(true)
    let filteredMovies

    if (selectedMovies.length) {
        switch (sortOrder) {
            case 'date':
                filteredMovies = dateSort(selectedMovies)

                break;

            case 'alphabetical':
                filteredMovies = alphabeticalSort(selectedMovies)
                break;

            default:
                filteredMovies = [...selectedMovies]
        }
        if (!isDescending) {
            filteredMovies.reverse()
        }

    }
    return (
        <>

            <div className='watchlist'>
                <div className="watchlist-header">
                    <h1>Your Watchlist</h1>
                    <div className="sort-container">
                        <label htmlFor='sort-options'>Sort by </label>
                        <select
                            className='select-box'
                            id="sort-options"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                        >
                            <option value="list">List order</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="date">Release date</option>
                        </select>
                        <div className={isDescending ? 'arrow-container active' : 'arrow-container'}>
                            <FaArrowDown
                                className='arrow'
                                onClick={() => {
                                    setIsDescending(true)
                                }} />
                        </div>
                        <div className={isDescending ? 'arrow-container' : 'arrow-container active'}>
                            <FaArrowUp
                                className='arrow'
                                onClick={() => {
                                    setIsDescending(false)
                                }} />
                        </div>
                    </div>
                </div>
                {selectedMovies.length ?
                    <ul className='watchlist-items'>
                        {filteredMovies.map(movie => (
                            <li
                                key={movie.id} className="watchlist-item"
                            >
                                <WatchlistItem
                                    {...movie}
                                />
                            </li>
                        )

                        )}
                    </ul>
                    : <div className="statusMsg-container">
                        <p className='statusMsg'>Empty</p>
                    </div>}
            </div>
        </>
    )
}

export default Watchlist

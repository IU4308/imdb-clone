import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Pagination = ({ limit }) => {
    const { pageId } = useParams()
    const pages = []

    for (let i = 1; i <= limit; i++) {
        pages.push(i)
    }

    return (
        <ul className='pages'>
            {pages.map(page => (
                <Link
                    className='nav-link'
                    to={`/movies/${page}`}
                    key={page}
                >
                    <li
                        key={page}
                        className={page == pageId ? 'active' : ''}
                    >
                        {page}
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default Pagination

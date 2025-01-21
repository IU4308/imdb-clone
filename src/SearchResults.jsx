import React from 'react'

const SearchResults = ({
    id, img, alt, title, stars, date
}) => {
    return (
        <div className="info-details">
            <div className="image-container">
                <img
                    className='info-image'
                    src={img}
                    alt={alt}
                />
            </div>
            <div className="info-search">
                <h1 className='info-title-container'>
                    <span className='info-title'>{title} </span>
                </h1>
                <p>{date}</p>
                <div className="">
                    <ul className='search-details'>
                        {stars.map((star, i) => (
                            <li key={star}>
                                {star + (i === stars.length - 1 ? '' : ',')}&nbsp;
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchResults

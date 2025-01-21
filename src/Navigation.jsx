import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/movies/1')
    }, [])
}

export default Navigation

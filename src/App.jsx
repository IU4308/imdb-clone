import Home from './Home'
import Layout from './Layout'
import Watchlist from './Watchlist'
import Missing from './Missing'
import { Routes, Route } from 'react-router-dom'
import MoviePage from './MoviePage'
import { DataProvider } from './context/DataContext'
import TrailerPage from './TrailerPage'
import Navigation from './Navigation'

function App() {

  return (
    <>
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigation />} />
            <Route path='/movies/:pageId' element={<Home />} />
            <Route path='/movies/movie/:movieId' element={<MoviePage />} />
            <Route path='/movies/trailer/:movieId' element={<TrailerPage />} />
            <Route path='/movies/watchlist' element={<Watchlist />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </DataProvider>
    </>
  )
}

export default App

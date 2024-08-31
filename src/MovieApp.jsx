
/*CODIGO MODIFICADO*/ 
import { useState } from 'react'
import './MovieApp.css'

const urlBase = 'https://api.themoviedb.org/3/search/movie'
const API_KEY = '54f669058e20dfd96d05f872192a8b2c'

export const MovieApp = () => {
  const [search, setSearch] = useState('')
  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  const handleInputChange = ({ target }) => {
    setSearch(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
      const data = await response.json()
      setMovieList(data.results)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleBackClick = () => {
    setSelectedMovie(null)
  }

  return (
    <div className='container'>
      <h1>Películas</h1>
      {selectedMovie ? (
        <div className='movie-details'>
          <div className='movie-content'>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} className='movie-poster' />
            <div className='movie-description'>
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.overview}</p>
              <button onClick={handleBackClick}>Volver</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Escribí una película'
              value={search}
              onChange={handleInputChange}
            />
            <button>Buscar</button>
          </form>

          {movieList.length > 0 && (
            <div className='movie-list'>
              {movieList.map(movie => (
                <div key={movie.id} className='movie-card'>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <button onClick={() => handleMovieClick(movie)}>Ver más</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
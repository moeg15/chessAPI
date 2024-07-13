import './home.css';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState({
    username: ''
  });

  const [ratings, setRatings] = useState({
    rapidCurrent: null,
    rapidBest: null,
    blitzCurrent: null,
    blitzBest: null,
    bulletCurrent: null,
    bulletBest: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const url = `https://api.chess.com/pub/player/${search.username}/stats`;
    console.log('Form submitted with:', search.username);
    console.log(url);
    
    // Fetch data from the API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        setRatings({
          rapidCurrent: data.chess_rapid?.last?.rating || 'N/A',
          rapidBest: data.chess_rapid?.best?.rating || 'N/A',
          blitzCurrent: data.chess_blitz?.last?.rating || 'N/A',
          blitzBest: data.chess_blitz?.best?.rating || 'N/A',
          bulletCurrent: data.chess_bullet?.last?.rating || 'N/A',
          bulletBest: data.chess_bullet?.best?.rating || 'N/A',
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="background">
      <h1 className='title'>check your chess rating</h1>
      <div className="container">
        <div className="search">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">player name:</label>
            <input 
              type="text" 
              id="search" 
              name="username" 
              value={search.username} 
              onChange={handleChange} 
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="ratings">
          <h3>Rapid</h3>
          <p>Current: {ratings.rapidCurrent}</p>
          <p>Best: {ratings.rapidBest}</p>
          <h3>Blitz</h3>
          <p>Current: {ratings.blitzCurrent}</p>
          <p>Best: {ratings.blitzBest}</p>
          <h3>Bullet</h3>
          <p>Current: {ratings.bulletCurrent}</p>
          <p>Best: {ratings.bulletBest}</p>
        </div>
      </div>
    </div>
  );
}

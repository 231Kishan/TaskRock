import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CharacterDetails from './CharacterDetails';

function App() {
  const [Data, setData] = useState([]);
  const [theme, setTheme] = useState('light');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme}>
      <Router>
        <header>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Data</h1>
                <ul>
                  {Data.map((ele) => (
                    <li key={ele.id}>
                      <Link to={`/character/${ele.id}`}>
                        <img src={ele.image} alt={ele.name} />
                        <h2>{ele.name}</h2>
                      </Link>
                      <p>Status: {ele.status}</p>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
          <Route
            path="/character/:id"
            element={<CharacterDetails data={Data} theme={theme} />}
          />
        </Routes>
        <footer>
          <p>Current Time: {time}</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
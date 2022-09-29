import { useEffect, useState } from 'react';
import './App.css';
import Clear from './assets/clear.jpg';
import Cloudy from './assets/cloudy.jpg'
import Overcast from './assets/overcast.jpg'
import Rainy from './assets/rainy.jpg'
import Snow from './assets/snow.jpg'
import SearchIcon from '@mui/icons-material/Search';


function App() {

  const [place, setPlace] = useState("Almaty");
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=ab5a6e0448e86f7a5ca29ee001056921`
    )
      .then((response) => response.json())
      .then((data) =>
        setPlaceInfo({
          name: data.name,
          country: data.sys.country,
          temp: {
            current: data.main.temp,
            high: data.main.temp_max,
            low: data.main.temp_min,
          },
          condition: data.weather[0].description,
        })
      );
    setPlace("")

  }

  const changePlace = (e) => {
    if (e.key === "Enter") {
      handleFetch()
    }
  }

  return (
    <div className="App"
      style={
        placeInfo.condition?.toLowerCase().includes('clear') ||
          placeInfo.condition?.toLowerCase() === 'sunny'
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes('snow')
            ? { backgroundImage: `url(${Snow})` }
            : placeInfo.condition?.toLowerCase().includes('rainy') ||
              placeInfo.condition?.toLowerCase().includes('drizzle')
              ? { backgroundImage: `url(${Rainy})` }
              : placeInfo.condition?.toLowerCase().includes('few clouds') ||
                placeInfo.condition?.toLowerCase().includes('scattered clouds')
                ? { backgroundImage: `url(${Cloudy})` }
                : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="search-input">
        <input
          type="text"
          value={place}
          autoFocus
          onKeyDown={(e) => changePlace(e)}
          onChange={(e) => setPlace(e.target.value)}
        />
        <SearchIcon onClick={handleFetch} fontSize="large" className="search-button" />
      </div>
      <div className="weather-wrapper">
        <div className="top-part">
          <h1>{Math.floor(placeInfo.temp?.current - 273)}° C</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
            <h1>{Math.floor(placeInfo.temp?.high - 273)}° C</h1>
            <h1>{Math.floor(placeInfo.temp?.low - 273)}° C</h1>
          </div>
        </div>
        <h2>{placeInfo.name}, {placeInfo.country}</h2>
      </div>
    </div>
  );
}

export default App;

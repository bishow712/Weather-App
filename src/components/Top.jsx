import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchYourInfo } from '../features/weather/weatherSlice'

function Top() {
  // State to store the user's city
  // const [userCity, setUserCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  const {yourWeatherInfo, isLoading, isSuccess, isError, message} = useSelector((state)=>{
    return state.weather
  })

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        position => {
          // Extract latitude and longitude from the position
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Use latitude and longitude to fetch city or other location details
          fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
            .then(response => response.json())
            .then(data => {
              // Extract city from the response
              const city = data.city;

              // Store the city in the state
              // setUserCity(city);
              // console.log(city)

              dispatch(fetchYourInfo(city))

              setLoading(false);
            })
            .catch(error => {
              // setLoading(true)
              // return (
              //   <div>
              //     {/* <h1>{`Error fetching city:${error}`}</h1> */}
              //     <h1>Error Happening</h1>
              //   </div>
              // )
              console.error('Error fetching city:', error)
              setLoading(false);
            });
        },
        error => {
          console.error('Error getting location:', error.message);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []); // The empty dependency array ensures that this effect runs only once

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {message}</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        <div className="weather-container">
          <div className="location">{yourWeatherInfo.location.name}, {yourWeatherInfo.location.country}</div>
          <div className="temperature">{yourWeatherInfo.current.temp_c}°C</div>
          <div className="condition">{yourWeatherInfo.current.condition.text}</div>
          <img className="icon" src={yourWeatherInfo.current.condition.icon} alt="Weather Icon" />
          <div className="details">
            <div className="detail">
              <strong>Wind</strong>
              {yourWeatherInfo.current.wind_mph} mph {yourWeatherInfo.current.wind_dir}
            </div>
            <div className="detail">
              <strong>Humidity</strong>
              {yourWeatherInfo.current.humidity}%
            </div>
            <div className="detail">
              <strong>Pressure</strong>
              {yourWeatherInfo.current.pressure_mb} mb
            </div>
            <div className="detail">
              <strong>Visibility</strong>
              {yourWeatherInfo.current.vis_km} km
            </div>
          </div>
        </div>
      </div>
      )}
    </div>    
  )

}

export default Top
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfo } from '../features/weather/weatherSlice'
import weatherSlice from '../features/weather/weatherSlice'

function Body() {

  const dispatch = useDispatch()

  const {weatherInfo, isLoading, isSuccess, isError, message} = useSelector((state)=>{
    return state.weather
  })

  if(weatherInfo.length === 0){
    // console.log("Inside IF")
    dispatch(fetchInfo())
  };

  // useEffect(() => {
  //   console.log('useEffect Inside')
  //   dispatch(fetchInfo())
  // }, [dispatch]);

  // useEffect(() => {

  //   console.log('Inside useEffect')
  //   // Check if the component is mounted (not necessary for the initial mount)
  //   let isMounted = true;

  //   // Run the effect only on the initial mount or when the page is refreshed
  //   if (isMounted) {
  //     dispatch(fetchInfo());
  //   }

  //   // Set isMounted to false when the component is unmounted
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [dispatch]);

  // console.log('Redux State:', useSelector((state) => state.weather));
  // console.log('useEffect Outside')

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {message}</p>;
  }

  if(isSuccess){
    return (
      <div>
        <div className="weather-container">
          <div className="location">{weatherInfo.location.name}, {weatherInfo.location.country}</div>
          <div className="temperature">{weatherInfo.current.temp_c}°C</div>
          <div className="condition">{weatherInfo.current.condition.text}</div>
          <img className="icon" src={weatherInfo.current.condition.icon} alt="Weather Icon" />
          <div className="details">
            <div className="detail">
              <strong>Wind</strong>
              {weatherInfo.current.wind_mph} mph {weatherInfo.current.wind_dir}
            </div>
            <div className="detail">
              <strong>Humidity</strong>
              {weatherInfo.current.humidity}%
            </div>
            <div className="detail">
              <strong>Pressure</strong>
              {weatherInfo.current.pressure_mb} mb
            </div>
            <div className="detail">
              <strong>Visibility</strong>
              {weatherInfo.current.vis_km} km
            </div>
          </div>
        </div>
      </div>
    )
  }

  
}

export default Body
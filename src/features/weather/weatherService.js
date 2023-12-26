import axios from 'axios'

const apiKey = 'ff93e10f45dc43d1b1953211232612'
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London&aqi=no`
const searchLocation = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=Nepal`

const fetchData = async () =>{
    const response = await axios.get(apiUrl)

    return response.data
}

const weatherService = {fetchData}

export default weatherService
import axios from "axios"

const getWeather = () => {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
    const API_KEY = `appid=${process.env.WEATHER_API}`

    /**
     * @name getByLatLon
     * @function
     * @async 
     * Get weather for location based of lat long
     * @param {string} lat - latitude
     * @param {string} lon - longitude
     * @returns {WeatherData} Weather forecast
     */
    const getByLatLon = async (lat: string, lon: string) => {
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`

        return await axios.get(URL)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    return 'There was an error'
                }
            })
            .catch((error) => {
                console.error(error)
                return 'There was an error'
            })
    }

    return {
        getByLatLon
    }

}

export default getWeather
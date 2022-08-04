import axios from "axios"

const getLocation = () => {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
    const API_KEY = `appid=${process.env.WEATHER_API}`

    /**
     * @name reverseGeoCode
     * @function 
     * @async
     * Take lat and lon of location and return the location's name
     * @param {string} lat - latitude
     * @param {string} lon - longitude
     * @returns 
     */
    const reverseGeoCode = async (lat: string, lon: string) => {
        const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`

        return await axios.get(URL)
            .then((response) => {
                if (response.data.length > 0) {
                    return response.data
                }

                return
            })
            .catch((error) => {
                console.error(error)
                return 'There was an error'
            })
    }

    /**
     * @name geoCode
     * @function 
     * @async
     * Get weather for location by city name
     * @param {string} cityName - City's name
     * @returns 
     */
    const geoCode = async (cityName: string) => {
        const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.WEATHER_API}`

        return await axios.get(URL)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.error(error)
                return 'There was an error'
            })
    }

    return {
        reverseGeoCode,
        geoCode
    }
}

export default getLocation
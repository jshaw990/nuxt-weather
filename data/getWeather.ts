import axios from "axios"

export default function getWeather() {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
    const API_KEY = `appid=${process.env.WEATHER_API}`

    async function getCurrentWeather(lat: String, lng: String) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API}`

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
        getCurrentWeather
    }

}

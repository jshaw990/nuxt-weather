const unitConversion = () => {
    /**
     * @name convertTemp
     * @function 
     * Convert the value from kelvin to metric or imperial units
     * @param {number} value: number to convert 
     * @param {boolean} unit: true = metric, false = imperial
     * @returns {number}  converted value rounded to whole number
     */
    const convertTemp = (value: number, unit: boolean) => {
        let temp = 0

        if (unit) {
            temp = value - 273.15
        } else {
            temp = value * (9 / 5) - 459.67
        }

        return Math.round(temp)
    }

    /**
     * @name convertSpeed
     * @function 
     * Convert the value from metres per second to km/h or mph
     * @param {number} value: number to convert 
     * @param {boolean} unit: true = metric, false = imperial
     * @returns {number} converted value rounded to whole 
     */
    const convertSpeed = (value: number, unit: boolean) => {
        let speed = 0

        if (unit) {
            speed = value * 3.6
        } else {
            speed = value * 2.23694
        }

        return Math.round(speed)
    }

    /**
     * @name convertPrecipitation
     * @function 
     * Convert the value from mm to metric or imperial units
     * @param {number} value: number to convert 
     * @param {boolean} unit: true = metric, false = imperial
     * @returns {number} converted value rounded to two or four decimals
     */
    const convertPrecipitation = (value: number, unit: boolean) => {
        let precipitation = 0

        if (unit) {
            precipitation = value
            precipitation = precipitation.toFixed(2)
        } else {
            precipitation = value * 0.0393701
            precipitation = precipitation.toFixed(4)
        }

        return precipitation
    }

    /**
     * @name convertTemp
     * @function 
     * Convert the value to metric or imperial units
     * @param {number} value: number to convert 
     * @param {boolean} unit: true = metric, false = imperial
     * @returns {number} converted value rounded to two decimals
     */
    const convertPressure = (value: number, unit: boolean) => {
        let pressure = 0

        if (unit) {
            pressure = value
        } else {
            pressure = value / 33.864
            pressure = pressure.toFixed(2)
        }

        return pressure
    }

    return {
        convertTemp,
        convertSpeed,
        convertPrecipitation,
        convertPressure
    }
}

export default unitConversion
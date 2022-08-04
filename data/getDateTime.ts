// Array of days of the week in string format
const daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

// Array of months of the year in string format
const monthsOfTheYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const getDateTime = () => {

    /**
     * @name getTime
     * @function 
     * Parse unix time to return current time in human readible format
     * If ensures that both hours and minutes contain two digits 
     * @param {number} value - time in unix format
     * @returns {string} hours:minutes
     */
    const getTime = (value: number) => {
        const date = new Date(value * 1000)

        const hours = ('0' + date.getHours()).substr(-2)
        const minutes = (date.getMinutes() + '0').substr(-2)

        return hours + ':' + minutes
    }

    /**
     * @name getDate
     * @function 
     * Parse unix time to return the current date in the following:
     * Day of week, Month, Day of month
     * @param {number} value - time in unix format
     * @param {boolean} addToday - if day of month is same as current return    Today instead of date
     * @returns {string} dayOfTheWeek, monthOfTheYear, DayOfMonth
     */
    const getDate = (value: number, addToday: boolean) => {
        const date = new Date(value * 1000)

        const dayOfWeek = date.getDay()
        const dayOfMonth = date.getDate()
        const month = date.getMonth()

        const today = new Date().getDate()

        if (dayOfMonth === today && addToday) {
            return 'Today'
        }

        return daysOfTheWeek[dayOfWeek] + ', ' + monthsOfTheYear[month] + ' ' + dayOfMonth
    }

    return {
        getTime,
        getDate
    }
}

export default getDateTime
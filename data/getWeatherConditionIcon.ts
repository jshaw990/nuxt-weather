const getWeatherConditionIcon = () => {
    // Array of icons to match ids that are passed
    const iconList = [
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 200
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 201
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 202
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 210
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 211
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 212
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 221
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 230
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 231
        },
        {
            name: 'thunderstorm',
            icon: 'mdi-weather-partly-lightning',
            id: 232
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 300
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 301
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 302
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 310
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 311
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 312
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 313
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 314
        },
        {
            name: 'drizzle',
            icon: 'mdi-weather-partly-rainy',
            id: 321
        },
        {
            name: 'rain',
            icon: 'mdi-weather-rainy',
            id: 500
        },
        {
            name: 'rain',
            icon: 'mdi-weather-rainy',
            id: 501
        },
        {
            name: 'rain',
            icon: 'mdi-weather-rainy',
            id: 502
        },
        {
            name: 'rain',
            icon: 'mdi-weather-rainy',
            id: 503
        },
        {
            name: 'rain',
            icon: 'mdi-weather-rainy',
            id: 504
        },
        {
            name: 'freezing rain',
            icon: 'mdi-weather-snowy-rainy',
            id: 511
        },
        {
            name: 'rain shower',
            icon: 'mdi-weather-partly-rainy',
            id: 520
        },
        {
            name: 'rain shower',
            icon: 'mdi-weather-partly-rainy',
            id: 521
        },
        {
            name: 'rain shower',
            icon: 'mdi-weather-partly-rainy',
            id: 522
        },
        {
            name: 'rain shower',
            icon: 'mdi-weather-partly-rainy',
            id: 531
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 600
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 601
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 602
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 611
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 612
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 613
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 615
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 616
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 620
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 621
        },
        {
            name: 'snow',
            icon: 'mdi-weather-snow-heavy',
            id: 622
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 701
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 711
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 721
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 731
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 741
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 751
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 761
        },
        {
            name: 'atmosphere',
            icon: 'mdi-weather-dust',
            id: 771
        },
        {
            name: 'tornado',
            icon: 'mdi-weather-hurricane',
            id: 781
        },
        {
            name: 'sunny',
            icon: 'mdi-weather-sunny',
            id: 800
        },
        {
            name: 'partly cloudy',
            icon: 'mdi-weather-partly-cloudy',
            id: 801
        },
        {
            name: 'partly cloudy',
            icon: 'mdi-weather-partly-cloudy',
            id: 802
        },
        {
            name: 'cloudy',
            icon: 'mdi-weather-cloudy',
            id: 803
        },
        {
            name: 'cloudy',
            icon: 'mdi-weather-cloudy',
            id: 804
        }
    ]

    /**
     * @name getIcon
     * @function 
     * Get the full name of a country based off country code
     * @param {number} value - weather condition ID code
     * @returns {string} mdi-icon 
     */
    const getIcon = (value: number) => {
        const iconIndex = iconList.find(x => x.id === value)

        if (iconIndex === undefined || iconIndex.icon === undefined) {
            return 'mdi-weather-cloudy'
        }
        return iconIndex.icon
    }

    return {
        getIcon
    }
}

export default getWeatherConditionIcon
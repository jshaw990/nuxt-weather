// Array of locations around the world with latitude and longitude
const randomLocations = [
    {
        name: 'Ottawa',
        lat: '45.385519',
        lon: '-75.736168'
    },
    {
        name: 'Toronto',
        lat: '43.641898',
        lon: '-79.3922564'
    },
    {
        name: 'Calgary',
        lat: '51.025499',
        lon: '-114.042874'
    },
    {
        name: 'Vancouver',
        lat: '49.259758',
        lon: '-123.109525'
    },
    {
        name: 'Halifax',
        lat: '55.649289',
        lon: '-63.590088'
    },
    {
        name: 'Montreal',
        lat: '45.499002',
        lon: '-73.572917'
    },
    {
        name: 'Boston',
        lat: '42.356881',
        lon: '-71.056786'
    },
    {
        name: 'New York',
        lat: '40.738247',
        lon: '-73.992320'
    },
    {
        name: 'Washington',
        lat: '38.896285',
        lon: '-77.036282'
    },
    {
        name: 'Atlanta',
        lat: '33.752732',
        lon: '-84.386292'
    },
    {
        name: 'Dallas',
        lat: '32.785349',
        lon: '-96.797920'
    },
    {
        name: 'Denver',
        lat: '39.733348',
        lon: '-104.987165'
    },
    {
        name: 'Seattle',
        lat: '47.602658',
        lon: '-122.307325'
    },
    {
        name: 'Phoenix',
        lat: '33.458496',
        lon: '-112.072632'
    },
    {
        name: 'Las Vegas',
        lat: '36.116257',
        lon: '-115.182245'
    },
    {
        name: 'Los Angelas',
        lat: '34.046181',
        lon: '-118.294376'
    },
    {
        name: 'Honolulu',
        lat: '21.330845',
        lon: '-157.896553'
    },
    {
        name: 'Paris',
        lat: '48.873599',
        lon: '2.295031'
    },
    {
        name: 'London',
        lat: '51.503245',
        lon: '-0.118653'
    },
    {
        name: 'Berlin',
        lat: '52.518380',
        lon: '13.376136'
    },
    {
        name: 'Rome',
        lat: '41.889430',
        lon: '12.391225'
    },
    {
        name: 'Madrid',
        lat: '40.451970',
        lon: '-3.688617'
    },
    {
        name: 'Vienna',
        lat: '48.204961',
        lon: '16.362907'
    },
    {
        name: 'Dubai',
        lat: '25.197895',
        lon: '55.273285'
    },
    {
        name: 'Johannesburg',
        lat: '-26.193331',
        lon: '28.033412'
    },
    {
        name: 'Mumbai',
        lat: '18.923895',
        lon: '72.833522'
    },
    {
        name: 'Bangkok',
        lat: '13.751446',
        lon: '100.494421'
    },
    {
        name: 'Singapore',
        lat: '1.295066',
        lon: '103.774152'
    },
    {
        name: 'Manila',
        lat: '14.581194',
        lon: '120.975960'
    },
    {
        name: 'Perth',
        lat: '-31.974571',
        lon: '115.851841'
    },
    {
        name: 'Sydney',
        lat: '-33.858135',
        lon: '151.214532'
    },
    {
        name: 'Auckland',
        lat: '-36.848218',
        lon: '174.761931'
    },
    {
        name: 'Hong Kong',
        lat: '22.314967',
        lon: '114.203495'
    },
    {
        name: 'Tokyo',
        lat: '35.681901',
        lon: '139.753426'
    },
    {
        name: 'Seoul',
        lat: '37.577718',
        lon: '126.976653'
    },
    {
        name: 'Anchorage',
        lat: '61.215049',
        lon: '-149.885027'
    },
    {
        name: 'Bogota',
        lat: '4.601986',
        lon: '-74.071869'
    },
    {
        name: 'Mexico City',
        lat: '19.433437',
        lon: '-99.133458'
    },
    {
        name: 'Buenos Aires',
        lat: '-34.608347',
        lon: '-58.371384'
    },
    {
        name: 'Cairo',
        lat: '30.004911',
        lon: '31.230376'
    },
]

/**
 * @name getRandomLocation
 * @function 
 * Get the lat-lon of a random location
 * @returns {object} name: {string} lat: {string} lon: {string}
 */
const getRandomLocation = async () => {
    const min = 0
    const max = randomLocations.length

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    let randomLocation = randomLocations[randomNumber]

    if (randomLocation.lat.length === 0 || randomLocation.lon.length === 0) {
        randomLocation = randomLocations[0]
    }

    return randomLocation
}

export default getRandomLocation
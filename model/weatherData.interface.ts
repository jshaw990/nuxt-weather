export interface WeatherData {
    timezone: String,
    current: Object,
    hourly: Object,
    daily: Array<Object>,
    alerts: Array<Object>
}
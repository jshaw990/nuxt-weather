export interface IWeatherData {
    current: CurrentWeather,
    hourly: Array<IHourlyWeather>,
    daily: Array<IDailyWeather>,
    minutely: Array<IMinutelyWeather>,
    alerts: Array<Object> | null, // Need to do
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
}

export class WeatherData implements IWeatherData {
    current = {} as CurrentWeather;
    hourly = [] as Array<HourlyWeather>;
    daily = [] as Array<DailyWeather>;
    minutely = [] as Array<MinutelyWeather>
    alerts = [] as Array<Object> | null;
    lat = 0;
    lon = 0;
    timezone = '';
    timezone_offset = 0;
}

export interface ICurrentWeather {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    temp: number,
    uvi: number,
    visibility: number,
    weather: Array<WeatherDescription>,
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export class CurrentWeather implements ICurrentWeather {
    clouds = 0;
    dew_point = 0;
    dt = 0;
    feels_like = 0;
    humidity = 0;
    pressure = 0;
    sunrise = 0;
    sunset = 0;
    temp = 0;
    uvi = 0;
    visibility = 0;
    weather = [] as Array<WeatherDescription>;
    wind_deg = 0;
    wind_gust = 0;
    wind_speed = 0;
}

export interface IDailyWeather {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: TempDescription,
    humidity: number,
    moon_phase: number,
    moonrise: number,
    moonset: number,
    pop: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    weather: Array<IWeatherDescription>,
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export class DailyWeather implements IDailyWeather {
    clouds = 0;
    dew_point = 0;
    dt = 0;
    feels_like = {} as TempDescription;
    humidity = 0;
    moon_phase = 0;
    moonrise = 0;
    moonset = 0;
    pop = 0;
    pressure = 0;
    sunrise = 0;
    sunset = 0;
    weather = [] as Array<WeatherDescription>;
    wind_deg = 0;
    wind_gust = 0;
    wind_speed = 0;
}

export interface IHourlyWeather {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: number,
    humidity: number,
    pop: number,
    pressure: number,
    temp: number,
    uvi: number,
    visibility: number,
    weather: Array<IWeatherDescription>,
    wind_deg: number,
    wind_gust: number,
    wind_speed: number,
}

export class HourlyWeather implements IHourlyWeather {
    clouds = 0;
    dew_point = 0;
    dt = 0;
    feels_like = 0;
    humidity = 0;
    pop = 0;
    pressure = 0;
    temp = 0;
    uvi = 0;
    visibility = 0;
    weather = [] as Array<WeatherDescription>;
    wind_deg = 0;
    wind_gust = 0;
    wind_speed = 0;
}

export interface IMinutelyWeather {
    dt: number,
    precipitation: number
}

export class MinutelyWeather implements IMinutelyWeather {
    dt = 0;
    precipitation = 0;
}

export interface ITempDescription {
    day: number,
    eve: number,
    max: number,
    min: number,
    morn: number,
    night: number,
}

export class TempDescription implements ITempDescription {
    day = 0;
    eve = 0;
    max = 0;
    min = 0;
    morn = 0;
    night = 0;
}

export interface IWeatherDescription {
    description: string,
    icon: string,
    id: number,
    main: string
}

export class WeatherDescription implements IWeatherDescription {
    description = '';
    icon = '';
    id = 0;
    main = '';
}
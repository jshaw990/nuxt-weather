export interface IUserLocation {
    lat: string | number,
    lon: string | number,
    timestamp?: number | null
}

export class UserLocation implements IUserLocation {
    lat = "";
    lon = "";
    timestamp?= null;
}
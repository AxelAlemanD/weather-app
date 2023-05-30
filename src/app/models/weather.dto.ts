export interface Weather {
    lat: number;
    lon: number;
    main: string;
    description: string;
    temp: number;
    max_temp: number;
    min_temp: number;
    humidity: number;
    rain: number;
    wind: number;
    date: Date | string;
    updated_at: Date | string;
}
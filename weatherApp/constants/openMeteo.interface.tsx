export interface DailyUnits {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
}

export interface DailyData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: DailyUnits;
    daily: DailyData;
}

export type WeatherState = WeatherData | undefined;

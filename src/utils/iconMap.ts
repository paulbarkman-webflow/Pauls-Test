// Weather icon mapping based on WMO weather codes
// Maps weather codes from Open-Meteo API to weather-icons CSS classes

interface IconMap {
  [key: number]: string;
}

const ICON_MAP: IconMap = {
  // Clear sky
  0: 'wi-day-sunny',
  
  // Mainly clear, partly cloudy, and overcast
  1: 'wi-day-cloudy',
  2: 'wi-cloudy',
  3: 'wi-cloudy',
  
  // Fog and depositing rime fog
  45: 'wi-fog',
  48: 'wi-fog',
  
  // Drizzle: Light, moderate, and dense intensity
  51: 'wi-sprinkle',
  53: 'wi-sprinkle',
  55: 'wi-sprinkle',
  
  // Freezing Drizzle: Light and dense intensity
  56: 'wi-sleet',
  57: 'wi-sleet',
  
  // Rain: Slight, moderate and heavy intensity
  61: 'wi-rain',
  63: 'wi-rain',
  65: 'wi-rain',
  
  // Freezing Rain: Light and heavy intensity
  66: 'wi-rain-mix',
  67: 'wi-rain-mix',
  
  // Snow fall: Slight, moderate, and heavy intensity
  71: 'wi-snow',
  73: 'wi-snow',
  75: 'wi-snow',
  
  // Snow grains
  77: 'wi-snow',
  
  // Rain showers: Slight, moderate, and violent
  80: 'wi-showers',
  81: 'wi-showers',
  82: 'wi-showers',
  
  // Snow showers slight and heavy
  85: 'wi-snow',
  86: 'wi-snow',
  
  // Thunderstorm: Slight or moderate
  95: 'wi-thunderstorm',
  
  // Thunderstorm with slight and heavy hail
  96: 'wi-thunderstorm',
  99: 'wi-thunderstorm',
};

export default ICON_MAP;

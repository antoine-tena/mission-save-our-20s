export const localResolveCoordinates = (locationName: string): { lat: number; lon: number } | null => {
  if (!locationName) return null;
  const name = locationName.trim().toLowerCase();
  const gpsMap: Record<string, [number, number]> = {
    "semnoz": [45.7981, 6.1042],
    "crêt de châtillon": [45.7981, 6.1042],
    "lac d'annecy": [45.8992, 6.1294],
    "annecy": [45.8992, 6.1294],
    "cinéma pathé": [45.9032, 6.1214],
    "cinéma pathé annecy": [45.9032, 6.1214],
    "pathé": [45.9032, 6.1214],
    "cinema": [45.9032, 6.1214],
    "cinéma": [45.9032, 6.1214],
    "col de la forclaz": [45.8111, 6.2435],
    "forclaz": [45.8111, 6.2435],
    "aravis": [45.87, 6.35],
    "bivouac aravis": [45.87, 6.35],
    "chamonix": [45.92, 6.87],
    "aiguille du midi": [45.92, 6.87]
  };
  
  for (const [key, coords] of Object.entries(gpsMap)) {
    if (name.includes(key)) {
      return { lat: coords[0], lon: coords[1] };
    }
  }
  return null;
};

export const fetchLiveWeather = async (
  latitude: number | null,
  longitude: number | null,
  location: string,
  eventDate: string,
  eventTime: string
): Promise<string | null> => {
  let lat = latitude;
  let lon = longitude;
  
  if (!lat || !lon) {
    const coords = localResolveCoordinates(location);
    if (coords) {
      lat = coords.lat;
      lon = coords.lon;
    }
  }

  if (!lat || !lon || !eventDate) {
    return null;
  }
  
  try {
    const dateStr = eventDate;
    const todayStr = new Date().toISOString().split('T')[0];
    const deltaDays = Math.floor((new Date(todayStr).getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    
    let url = "";
    if (0 <= deltaDays && deltaDays <= 90) {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&past_days=${deltaDays}&hourly=temperature_2m,weather_code`;
    } else {
      url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date={dateStr}&end_date=${dateStr}&hourly=temperature_2m,weather_code`;
    }
    
    // Safety check for template string replacement in case start_date / end_date were template literals
    url = url.replace("{dateStr}", dateStr).replace("{dateStr}", dateStr);

    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    const hourly = data.hourly || {};
    const times = hourly.time || [];
    const temps = hourly.temperature_2m || [];
    const codes = hourly.weather_code || [];
    
    if (!times.length || !temps.length || !codes.length) {
      return null;
    }
    
    let index = 0;
    if (eventTime) {
      const timePrefix = eventTime.substring(0, 2);
      const foundIdx = times.findIndex((t: string) => t.startsWith(`${dateStr}T${timePrefix}:`));
      if (foundIdx !== -1) index = foundIdx;
    }
    
    let temp = temps[index];
    let code = codes[index];
    
    if (index === 0 && !eventTime) {
      temp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;
      const counts = codes.reduce((acc: any, val: number) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const sortedCodes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      code = parseInt(sortedCodes[0], 10);
    }
    
    const WMO_MAP: any = {
      0: ['☀️', 'Ciel dégagé'],
      1: ['🌤️', 'Principalement dégagé'],
      2: ['⛅', 'Partiellement nuageux'],
      3: ['☁️', 'Nuageux'],
      45: ['🌫️', 'Brouillard'],
      48: ['🌫️', 'Brouillard givrant'],
      51: ['🌧️', 'Bruine légère'],
      53: ['🌧️', 'Bruine modérée'],
      55: ['🌧️', 'Bruine dense'],
      56: ['🌧️', 'Bruine verglaçante'],
      57: ['🌧️', 'Bruine verglaçante'],
      61: ['🌧️', 'Pluie faible'],
      63: ['🌧️', 'Pluie modérée'],
      65: ['🌧️', 'Pluie forte'],
      66: ['🌧️', 'Pluie verglaçante'],
      67: ['🌧️', 'Pluie verglaçante'],
      71: ['❄️', 'Neige légère'],
      73: ['❄️', 'Neige modérée'],
      75: ['❄️', 'Neige forte'],
      77: ['❄️', 'Grains de neige'],
      80: ['🌦️', 'Averses de pluie'],
      81: ['🌦️', 'Averses de pluie'],
      82: ['🌦️', 'Averses de pluie'],
      85: ['❄️', 'Averses de neige'],
      86: ['❄️', 'Averses de neige'],
      95: ['⛈️', 'Orage'],
      96: ['⛈️', 'Orage avec grêle'],
      99: ['⛈️', 'Orage avec grêle']
    };
    
    const [emoji, desc] = WMO_MAP[code] || ['🌡️', 'Météo générale'];
    return `${emoji} ${temp.toFixed(1)}°C - ${desc} (Direct)`;
  } catch (e) {
    console.error('Erreur lors du fetch météo de simulation :', e);
    return null;
  }
};

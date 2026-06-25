from datetime import date
from typing import Optional, Any
import requests
from collections import Counter

WMO_WEATHER_MAP = {
    0: ('☀️', 'Ciel dégagé'),
    1: ('🌤️', 'Principalement dégagé'),
    2: ('⛅', 'Partiellement nuageux'),
    3: ('☁️', 'Nuageux'),
    45: ('🌫️', 'Brouillard'),
    48: ('🌫️', 'Brouillard givrant'),
    51: ('🌧️', 'Bruine légère'),
    53: ('🌧️', 'Bruine modérée'),
    55: ('🌧️', 'Bruine dense'),
    56: ('🌧️', 'Bruine verglaçante légère'),
    57: ('🌧️', 'Bruine verglaçante dense'),
    61: ('🌧️', 'Pluie faible'),
    63: ('🌧️', 'Pluie modérée'),
    65: ('🌧️', 'Pluie forte'),
    66: ('🌧️', 'Pluie verglaçante légère'),
    67: ('🌧️', 'Pluie verglaçante forte'),
    71: ('❄️', 'Chute de neige légère'),
    73: ('❄️', 'Chute de neige modérée'),
    75: ('❄️', 'Chute de neige forte'),
    77: ('❄️', 'Grains de neige'),
    80: ('🌦️', 'Averses de pluie faibles'),
    81: ('🌦️', 'Averses de pluie modérées'),
    82: ('🌦️', 'Averses de pluie violentes'),
    85: ('❄️', 'Averses de neige faibles'),
    86: ('❄️', 'Averses de neige fortes'),
    95: ('⛈️', 'Orage faible à modéré'),
    96: ('⛈️', 'Orage avec grêle faible'),
    99: ('⛈️', 'Orage avec grêle forte'),
}

def resolve_coordinates(location_name: str | None) -> tuple[float | None, float | None]:
    """Résout des noms de lieux courants vers leurs coordonnées GPS."""
    if not location_name:
        return None, None
    name = location_name.strip().lower()

    # Essayer de chercher en base de données SavedLocation d'abord
    try:
        from .models import SavedLocation
        # 1. Correspondance directe ou partielle insensible à la casse
        loc = SavedLocation.objects.filter(name__icontains=name).first()
        if loc:
            return loc.latitude, loc.longitude
        # 2. Chercher si l'un de nos lieux DB est inclus dans le texte cherché
        # ex: recherche "Pathé Décines" matche "Pathé"
        for db_loc in SavedLocation.objects.all():
            if db_loc.name.lower() in name:
                return db_loc.latitude, db_loc.longitude
    except Exception as e:
        print(f"Erreur de résolution GPS base de données : {e}")

    # Repli (fallback) sur le dictionnaire en dur d'origine
    gps_map = {
        "semnoz": (45.7981, 6.1042),
        "crêt de châtillon": (45.7981, 6.1042),
        "lac d'annecy": (45.8992, 6.1294),
        "annecy": (45.8992, 6.1294),
        "cinéma pathé": (45.9032, 6.1214),
        "cinéma pathé annecy": (45.9032, 6.1214),
        "pathé": (45.9032, 6.1214),
        "cinema": (45.9032, 6.1214),
        "cinéma": (45.9032, 6.1214),
        "col de la forclaz": (45.8111, 6.2435),
        "forclaz": (45.8111, 6.2435),
        "aravis": (45.87, 6.35),
        "bivouac aravis": (45.87, 6.35),
        "chamonix": (45.92, 6.87),
        "aiguille du midi": (45.92, 6.87),
    }
    for key, coords in gps_map.items():
        if key in name:
            return coords
    return None, None

def fetch_open_meteo_weather(lat: float, lon: float, event_date: date, event_time: Optional[Any] = None) -> Optional[str]:
    """Interroge Open-Meteo pour obtenir les données météo réelles d'une date passée."""
    try:
        from datetime import date as dt_date
        delta_days = (dt_date.today() - event_date).days
        
        # Choix de l'API selon l'ancienneté du souvenir
        if 0 <= delta_days <= 90:
            url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&past_days={delta_days}&hourly=temperature_2m,weather_code"
        else:
            date_str = event_date.strftime("%Y-%m-%d")
            url = f"https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date={date_str}&end_date={date_str}&hourly=temperature_2m,weather_code"
            
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            return None
            
        weather_payload = response.json()
        hourly = weather_payload.get('hourly', {})
        times = hourly.get('time', [])
        temps = hourly.get('temperature_2m', [])
        codes = hourly.get('weather_code', [])
        
        if not times or not temps or not codes:
            return None
            
        index = None
        # Recherche de l'heure précise si spécifiée
        if event_time:
            time_str_prefix = ""
            if isinstance(event_time, str):
                time_str_prefix = event_time[:2]
            else:
                time_str_prefix = event_time.strftime("%H")
                
            for i, t in enumerate(times):
                if t.startswith(f"{event_date.strftime('%Y-%m-%d')}T{time_str_prefix}:"):
                    index = i
                    break
                    
        if index is not None and index < len(temps) and index < len(codes):
            temp = temps[index]
            code = codes[index]
        else:
            temp = sum(temps) / len(temps)
            code = Counter(codes).most_common(1)[0][0]
            
        emoji, desc = WMO_WEATHER_MAP.get(code, ('🌡️', 'Météo générale'))
        return f"{emoji} {temp:.1f}°C - {desc}"
        
    except Exception as e:
        print(f"Erreur lors de la récupération de la météo Open-Meteo : {e}")
        return None

def get_absolute_media_url(request: Any, file_field: Any) -> Optional[str]:
    """Construit l'URL absolue d'un champ de fichier Django s'il est renseigné."""
    if file_field and request:
        try:
            return request.build_absolute_uri(file_field.url)
        except ValueError:
            return None
    return None

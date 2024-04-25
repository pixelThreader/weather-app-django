import datetime
import requests
import json
import ephem
from astral.sun import sun
from astral.moon import moonrise, moonset
from astral import LocationInfo
def predict_weather(vars_input):
    file_path = 'utilities/manipulate.json'
    with open(file_path, 'r') as file:
        data = json.load(file)
    def get_target_weather(vars_input):
        for entry in data["data-weather"]:
            if any(var.lower() in str(vars_input).lower() for var in entry["vars"]):
                return entry["target"], entry["target-img"]
        return "No matching weather found"
    matching_weather = get_target_weather(vars_input)
    return matching_weather
def get_day_name(date_str):
    date_obj = datetime.datetime.strptime(date_str, "%d-%m-%Y")
    day_name = date_obj.strftime("%a")
    return day_name
def weather(place, lat, long):
    url = f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration'   
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        location = place
        current = data.get('current', {})
        today_data = {
            "date": datetime.datetime.now().strftime("%d-%m-%Y"),
            "last-update": current.get('time', ''),
            "max_temp_c": round(current.get('temperature_2m', 0)),
            "max_temp_f": round((current.get('temperature_2m', 0) - 32) * 5/9),
            "weather": predict_weather(current.get('weather_code', ''))[0],
            "date_time": datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
            "precipitation": int(current.get('precipitation', 0)),
            "humidity": int(current.get('relative_humidity_2m', 0)),
            "wind_kmh": round(current.get('wind_speed_10m', 0) * 3.6),
            "wind_mph": round(current.get('wind_speed_10m', 0) * 2.23694)
        }
        
        forecast = data.get('daily', {}).get('time', [])
        weather_codes = data.get('daily', {}).get('weather_code', [])
        max_temps = data.get('daily', {}).get('temperature_2m_max', [])
        min_temps = data.get('daily', {}).get('temperature_2m_min', [])
        forecast_data = []

        for i in range(len(forecast)):
            forecast_data.append({
                "day": get_day_name(datetime.datetime.strptime(forecast[i], "%Y-%m-%d").strftime("%d-%m-%Y")),
                "max_temp_c": round(max_temps[i]),
                "max_temp_f": round((max_temps[i] - 32) * 5/9),
                "min_temp_c": round(min_temps[i]),
                "min_temp_f": round((min_temps[i] - 32) * 5/9),
                "weather": predict_weather(weather_codes[i])[0]
            })

        return {
            "location": location,
            "today": today_data,
            "forecast": {
                "no_of_days": len(forecast_data),
                "days": forecast_data
            }
        }
    
    return {}


class getLocation:
    def getCountries(file_path, country_name=None):
        with open(file_path, 'r', encoding='utf-8') as file:
            countries_data = json.load(file)
        if country_name:
            return [country for country in countries_data if country['name'] == country_name][0]
        else:
            return [country['name'] for country in countries_data]

    def getStates(file_path, country_name):
        with open(file_path, 'r', encoding='utf-8') as file:
            states_data = json.load(file)
        country_states = [state["name"] for state in states_data if state["country_name"].lower() == country_name.lower()]
        return country_states

    def getCities(file_path, country_name, state_name):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        cities = [entry["name"] for entry in data if entry["country_name"].lower() == country_name.lower() and entry["state_name"].lower() == state_name.lower()]
        return cities

    def getCoords(file_path, city_name, state_name, country_name):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        city_name = city_name.lower()
        state_name = state_name.lower()
        country_name = country_name.lower()
        for entry in data:
            current_city = entry["name"].lower()
            current_state = entry["state_name"].lower()
            current_country = entry["country_name"].lower()
            if current_city == city_name and current_state == state_name and current_country == country_name:
                latitude, longitude = entry["latitude"],  entry["longitude"]
                return latitude, longitude
        return None
def get_season(latitude, longitude):
    observer = ephem.Observer()
    observer.lat = str(latitude)
    observer.lon = str(longitude)
    current_time = datetime.datetime.utcnow()
    observer.date = current_time
    month = current_time.month
    w, x, y, z = "Spring", "Summer", "Autmn", "Winter"
    if 3 <= month <= 5:
        return w
    elif 6 <= month <= 8:
        return x
    elif 9 <= month <= 11:
        return y
    else:
        return z
def isSunSetRise(city, lat, lng, reg, tmz):
    city = LocationInfo(city, reg, tmz, lat, lng)
    sunn = sun(city.observer, date=datetime.date.today(), tzinfo=tmz)
    return sunn
def isMoonRiseSet(city, lat, lng, reg, tmz):
    city_info = LocationInfo(city, reg, tmz, lat, lng)
    today = datetime.date.today()
    moonrise_time = moonrise(city_info.observer, today)
    moonset_time = moonset(city_info.observer, today)
    return moonrise_time, moonset_time
def predict_season(vars_input):
    file_path = 'utilities/manipulate.json'
    with open(file_path, 'r') as file:
        data = json.load(file)
    def get_target_weather(vars_input):
        for entry in data["data-season"]:
            if any(var.lower() in vars_input.lower() for var in entry["season"]):
                return entry["target"], entry["icon-path"], entry["icon-path2"], entry["img-path"]
        return "No matching weather found"
    matching_weather = get_target_weather(vars_input)
    return matching_weather
import json
file_path = 'utilities/manipulate.json'
with open(file_path, 'r') as file:
    data = json.load(file)
def get_target_weather(vars_input):
    for entry in data["data-weather"]:
        if any(var.lower() in vars_input.lower() for var in entry["vars"]):
            return entry["target"], entry["target-img"]
    return "No matching weather found"
def predict_weather(input_vars):
    matching_weather = get_target_weather(input_vars)
    return matching_weather

weather_info = predict_weather("clear")
print(weather_info[0])
print(weather_info[1])
from django.shortcuts import render
from django.http import JsonResponse
from utilities import utilities
from datetime import datetime

# Create your views here.

def index(request):
    return render(request, 'index.html')

def acknowledge(request):
    return render(request, 'acknowledge.html')

def api3104(request):
    if request.method == 'POST':
        # data01 = request.POST.get('targetregion')
        data02 = request.POST.get('targetcountry')
        data03 = request.POST.get('targetstate')
        data04 = request.POST.get('targetcity')
        data05 = request.POST.get('targetlocationlat')
        data06 = request.POST.get('targetlocation')
        current_datetime = datetime.now()
        formatted_date = current_datetime.strftime("%d-%m-%Y %A")
        foreweat = utilities.weather(data04+'+'+data03+'+'+data02)
        data = {'data': foreweat, 'season': {}}
        toda_ka_weather = data['data']['today']['weather']
        data['data']['today']['t_ts'] = formatted_date
        weatherimg = utilities.predict_weather(toda_ka_weather)[1]
        data['data']['today']['weather_img']=weatherimg
        for idx, day in enumerate(data['data']['forecast']['days'], start=1):
            weather_image = utilities.predict_weather(day['weather'])[1]
            day['weather_image'] = weather_image
            idx+=1
        seasonIS = utilities.get_season(data05, data06).lower()
        seasonget = utilities.predict_season(seasonIS)
        data['season']['name']=seasonget[0]
        data['season']['icon']=seasonget[1]
        data['season']['icon_loc']=seasonget[2]
        data['season']['bg']=seasonget[3]
        return JsonResponse(data)
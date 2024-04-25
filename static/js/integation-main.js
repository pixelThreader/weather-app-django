$('#get-target-location').click(function () {
    if ($(this).attr('data-purpose') == 'search' || $(this).attr('data-search') == '1') {
        console.clear();
        $('#loadingcontent').fadeIn(500);
        $('body').addClass('overflow-hidden');
        const apiUrl = $('#target-api-url').val();
        const requestData = {
            targetregion: $('#target-region').val(),
            targetcountry: $('#target-country').val(),
            targetstate: $('#target-state').val(),
            targetcity: $('#target-city').val(),
            targetlocation: $('#target-location-long').val(),
            targetlocationlat: $('#target-location-lat').val()
        };
        const urlParams = new URLSearchParams(requestData);
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': $('[name=csrfmiddlewaretoken]').val(),
            },
            body: urlParams.toString()
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Response data:', data);
            console.log('Response data location:', data.data.location);
            console.log('Response data today:', data.data.today);
            console.log('Response data forecast days:', data.data.forecast.no_of_days);
            console.log('Response data forecast:', data.data.forecast);
            manipulatetheweathertothewebsite(data.data, data.season).then(() => {
                setTimeout(() => {
                    $('body').removeClass('overflow-hidden');
                    $('#loadingcontent').fadeOut(500);
                }, 500);
            });
        }).catch((e) => {
            // Handle errors
            $('body').removeClass('overflow-hidden');
            $('#loadingcontent').fadeOut(500);
            console.error('Server Error At Fetching Data!!');
            console.log(e);
        });
    }
});
function manipulatetheweathertothewebsite(data, season) {
    return Promise.all([
        // Todays Forecast
        console.log(season),
        $("#weather-today").attr('src', data.today.weather_img),
        changeTippy('#weather-today', data.today.weather),
        gsap.to("#today-temp-var", { text: `${data.today.max_temp_c} °C`, duration: 1 }).then(() => changeTippy('#today-temp-var', `${data.today.max_temp_c} °C`), $(`#today-temp-var`).attr('data-altT', `${data.today.max_temp_f} °F`)),
        gsap.to("#id-curr-wethr", { text: data.today.weather, duration: 1 }).then(() => { changeTippy('#id-curr-wethr', data.today.weather) }),
        gsap.to("#today-pptn", { text: `${data.today.precipitation}%`, duration: 1 }).then(() => { changeTippy('#today-pptn-tippy', `Percipitation: ${data.today.precipitation}%`) }),
        gsap.to("#today-hmdty", { text: `${data.today.humidity}%`, duration: 1 }).then(() => { changeTippy('#today-hmdty-tippy', `Humidity: ${data.today.humidity}%`) }),
        gsap.to("#today-wnd1", { text: `${data.today.wind_kmh} kmh`, duration: 1 }).then(() => { changeTippy('#today-wnd1-tippy', `Wind Speed (kmh): ${data.today.wind_kmh} kmh`) }),
        gsap.to("#today-wnd2", { text: `${data.today.wind_mph} mph`, duration: 1 }).then(() => { changeTippy('#today-wnd2-tippy', `Wind Speed (mph): ${data.today.wind_mph} mph`) }),
        gsap.to("#target-season", { text: `${season.name}`, duration: 1 }).then(() => { changeTippy('#season-tippy', season.name)}),
        $("#img-place-season0431").attr('src', `/${season.icon_loc}`),
        $("#target-season-img").attr('src', `/${season.icon}`),
        $("#target-season-img-bg").attr('src', `/${season.bg}`),
        $("#forecast-last-updt").text(data.today.t_ts),
        // Additional ForeCast
        // d1
        ...data.forecast.days.map((day, index) => [
            $(`#d0${index + 1}img`).attr('src', day.weather_image),
            changeTippy(`#d0${index + 1}img`, day.weather),
            gsap.to(`#d0${index + 1}day`, { text: `${day.day}`, duration: 1 }).then(() => { changeTippy(`#d0${index + 1}day`, getFullDayName(day.day)) }),
            gsap.to(`#d0${index + 1}wtr`, { text: `${day.weather}`, duration: 1 }).then(() => { changeTippy(`#d0${index + 1}wtr`, day.weather) }),
            gsap.to(`#d0${index + 1}max`, { text: `${day.max_temp_c} °C`, duration: 1 }).then(() => { changeTippy(`#d0${index + 1}max`, `${day.max_temp_c} °C`) }),
            $(`#d0${index + 1}max`).attr('data-altT', `${day.max_temp_f} °F`),
            gsap.to(`#d0${index + 1}min`, { text: `${day.min_temp_c} °C`, duration: 1 }).then(() => { changeTippy(`#d0${index + 1}min`, `${day.min_temp_c} °C`) }),
            $(`#d0${index + 1}min`).attr('data-altT', `${day.min_temp_f} °F`),
        ])
    ]);
}

function getFullDayName(shortDay) {
    const shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const lowerCaseShortDay = shortDay.toLowerCase();
    const index = shortDays.indexOf(lowerCaseShortDay);
    if (index !== -1) {
        return fullDays[index];
    } else {
        return 'Invalid Day';
    }
}
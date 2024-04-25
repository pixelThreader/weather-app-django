let tgt_reg = '', tgt_count = '', tgt_stat = '', tgt_city = '';

var chart = am4core.create("map", am4maps.MapChart);
chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Miller();

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;

var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#74B266"); // Default fill color
polygonTemplate.stroke = am4core.color("rgba(0, 0, 0, .3)"); // Country border color
polygonTemplate.strokeWidth = .5; // Country border width
polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer; // Set cursor to pointer

// Handle region selection
polygonTemplate.events.on("hit", function (ev) {
    // Reset previous selected regions' color
    polygonSeries.mapPolygons.each(function (mapPolygon) {
        mapPolygon.isActive = false;
    });

    // Handle region selection here
    var selectedRegion = ev.target;
    selectedRegion.isActive = true;

    var selectedRegionISO = selectedRegion.dataItem.dataContext.id;
    $('#target-country').attr('data-c-code', selectedRegionISO)
    searchCountry(selectedRegionISO)
});

var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = am4core.color("#FFA500");
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");
chart.zoomControl = new am4maps.ZoomControl();

document.getElementById("reset-map").addEventListener("click", function () {
    polygonSeries.mapPolygons.each(function (mapPolygon) {
        mapPolygon.isActive = false;
    });
    chart.goHome();
    gsap.to('#region-sel', {
        duration: .5,
        text: 'Region'
    })
    gsap.to('#country-sel', {
        duration: .5,
        text: 'Country'
    })
    gsap.to('#state-sel', {
        duration: .5,
        text: 'State'
    })
    gsap.to('#city-sel', {
        duration: .5,
        text: 'City'
    })
    gsap.to('#mapModalLabel', {
        duration: .5,
        text: 'Select Country'
    })
    gsap.to('#get-target-location', {
        duration: .5,
        text: 'Select Country'
    })


    $('#map').slideDown(500)
    $('#state-dist').slideUp(250)
    $('#city-dist').slideUp(250);
    $('#state-dist').empty().html(`<span class="clue chFontGSP">Loading...</span>`);
    $('#city-dist').empty().html(`<span class="clue chFontGSP">Loading...</span>`);
    $('#get-target-location').attr('data-puprus', 'country');
    $('#get-target-location').attr('data-search', '0');
    $('#get-target-location').removeAttr('data-bs-dismiss', 'modal');
});

function searchCountry(iso2Code) {
    fetch('/static/utils/getCountryISO2.json')
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty(iso2Code)) {
                var countryData = data[iso2Code];
                var region = countryData.region;
                let country = countryData.target;
                $('#target-region').val(region)
                $('#target-country').val(countryData.target)
                gsap.to('#region-sel', {
                    duration: .5,
                    text: region
                })
                gsap.to('#country-sel', {
                    duration: .5,
                    text: country
                })
                tgt_reg = region;
                tgt_count = country;
            } else {
                console.error(iso2Code + ': 404 Not Found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
// get tge states of selected country
$('#get-target-location').click(function () {
    if ($(this).attr('data-puprus') == 'country') {
        $('#map').slideUp(500);
        $('#state-dist').slideDown(250);
        $('#located-Region').text(tgt_reg);
        $('#located-Country').text(tgt_count);
        changeTippy('#located-Region', `Region: ${tgt_reg}`)
        changeTippy('#located-Country', `Country: ${tgt_count}`)

        gsap.to('#mapModalLabel', {
            duration: .5,
            text: 'Select State'
        })
        gsap.to('#get-target-location', {
            duration: .5,
            text: 'Select State'
        })
        $(this).attr('data-puprus', 'states')
        let cont = $('#target-country').val();

        try {
            getStatesByCountry(cont)
                .then(states => manipulateStates(states))
                .then(() => {
                    $(".state-box").click(function () {
                        $('.state-box').removeClass('active');
                        $(this).addClass('active')
                        let stte__ = $(this).text();
                        gsap.to('#state-sel', {
                            duration: 0.5,
                            text: stte__
                        });
                        $('#located-State').text(stte__);
                        changeTippy('#located-State', `State: ${stte__}`);
                        $('#target-state').val(stte__);
                        tgt_stat = stte__;
                    });
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    } else if ($(this).attr('data-puprus') == 'states') {
        $('#map').slideUp(500);
        $('#state-dist').slideUp(250);
        $('#city-dist').slideDown(250);
        $('#located-Region').text(tgt_reg);
        $('#located-Country').text(tgt_count);

        gsap.to('#mapModalLabel', {
            duration: .5,
            text: 'Select City'
        })
        gsap.to('#get-target-location', {
            duration: .5,
            text: 'Get Weather'
        })
        $(this).attr('data-puprus', 'cities');

        try {
            const countryName = $('#target-country').val();
            const countryCode = $('#target-country').attr('data-c-code');
            const stateName = $('#target-state').val();
            findCities(countryName, stateName, countryCode)
                .then(cities => manipulateCities(cities))
                .then(() => {
                    $(".city-box").click(function () {
                        $('.city-box').removeClass('active');
                        $(this).addClass('active')
                        let city__ = $(this).text();
                        gsap.to('#city-sel', {
                            duration: 0.5,
                            text: city__
                        });
                        $('#located-city').text(city__);
                        changeTippy('#located-city', `City: ${city__}`);
                        $('#target-city').val(city__);
                        $('#target-location-long').val($(this).attr('long'));
                        $('#target-location-lat').val($(this).attr('lat'));
                        $('#get-target-location').attr('data-search', '1');
                        $('#get-target-location').attr('data-bs-dismiss', 'modal');
                        tgt_city = city__
                    });
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    } else if ($(this).attr('data-puprus') == 'cities') {
        $(this).attr('data-puprus', 'search')
    }
});
async function getStatesByCountry(countryName) {
    try {
        const response = await fetch('..\\static\\place\\states.json');
        const data = await response.json();
        const states = data.filter(state => state.country_name === countryName);
        return states;
    } catch (error) {
        console.error('Error fetching states:', error);
        return [];
    }
}
function manipulateStates(states_list) {
    let stts = '';
    for (let i = 0; i < states_list.length; i++) {
        const elem = states_list[i];
        stts += `<div class="state-box chFontGSP ${$('#theme-font').val()}">${elem.name}</div>`
    }
    $('#state-dist').html(stts)
}
// City Manipulation
async function findCities(countryName, stateName, countryCode) {
    try {
        // Fetch the city.json file
        const response = await fetch('..\\static\\place\\search_city.json');
        const cityData = await response.json();
        // Filter cities based on the provided parameters
        const filteredCities = cityData.filter(city => {
            return (
                city.country_name === countryName &&
                city.state_name === stateName &&
                city.country_code === countryCode
            );
        });

        return filteredCities;
    } catch (error) {
        console.error('Error fetching or parsing city data:', error);
        return [];
    }
}
function manipulateCities(cities_list) {
    let citis = '';
    for (let i = 0; i < cities_list.length; i++) {
        const elem = cities_list[i];
        citis += `<div class="city-box chFontGSP ${$('#theme-font').val()}" lat="${elem.latitude}" long="${elem.longitude}">${elem.name}</div>`
    }
    $('#city-dist').empty();
    $('#city-dist').html(citis);
}
// ydp : cm
// yde : am
// ydi : gm
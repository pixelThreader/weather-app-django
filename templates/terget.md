# WeatherApp

### Table of contents
- List of conents used in js Manipulation.
- Class and Id of Target elems with description.


---
---


#### Contents Used In JS Manipulation:
| ID | CLASS | Description|
|:----|:-------:|:--------------:|
| **today-temp-var** | ----- | This element contains the todays temperature with unit included.
| **weather-today** | ----- | This element contains the todays weather img.
| **id-curr-wethr** | ----- | This element contains the todays weather.
| **today-pptn** | ----- | This element contains the todays Percipitation.
| **today-pptn-tippy** | ----- | Tooltip Percipitation.
| **today-hmdty** | ----- | This element contains the todays Humidity.
| **today-hmdty-tippy** | ----- | Tippy Humidity.
| **today-wnd1** | ----- | This element contains the todays Wind Speed (kmh).
| **today-wnd1-tippy** | ----- | Toolyip Wind Speed (kmh).
| **today-wnd2** | ----- | This element contains the todays Wind Speed (mph).
| **today-wnd2-tippy** | ----- | Tooltip Wind Speed (mph).
| **img-place-season0431** | ----- | This element contains the Season of target Location at the current location.
| **season-tippy** | ----- | This is Tippy for season.
| **target-season** | ----- | This element contains the Season of target Location.
| **target-season-img-bg** | ----- | This img element contains the Season image at the background of the second part.
| **target-season-img** | ----- | This img element contains the Season image.
| **forecast-last-updt** | ----- | This element contains the todays date and day in format ( **dd-mm-yyyy {day}** ).
| ----- | **wish** | This element contains the wish according to time.
| ----- | **manipIMG** | These elements images.....all for animation.
| **timezone-img** | ----- | This image element contains the image of the current time.

<hr style="background: aqua">
<br>
<br>

# The Additional Forecast

```
NOTE: The below listed are ids only.
```

```
NOTE: Add class `temp3104` to those elements who has to change to be fartenheit.
```

>> <h1 style="color:pink">Element 01</h1>
> <code> image: <span style="color:lightgreen">d01img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d01day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d01wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d01max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d01min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d01max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d01min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 02</h1>
> <code> image: <span style="color:lightgreen">d02img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d02day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d02wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d02max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d02min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d02max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d02min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 03</h1>
> <code> image: <span style="color:lightgreen">d03img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d03day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d03wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d03max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d03min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d03max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d03min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 04</h1>
> <code> image: <span style="color:lightgreen">d04img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d04day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d04wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d04max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d04min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d04max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d04min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 05</h1>
> <code> image: <span style="color:lightgreen">d05img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d05day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d05wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d05max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d05min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d05max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d05min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 06</h1>
> <code> image: <span style="color:lightgreen">d06img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d06day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d06wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d06max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d06min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d06max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d06min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 07</h1>
> <code> image: <span style="color:lightgreen">d07img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d07day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d07wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d07max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d07min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d07max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d07min -> attr(data-altT)</span></code>

>> <h1 style="color:pink">Element 08</h1>
> <code> image: <span style="color:lightgreen">d08img</span></code>
> <br>
> <code> day: <span style="color:lightgreen">d08day</span></code>
> <br>
> <code> Weather: <span style="color:lightgreen">d08wtr</span></code>
> <br>
> <code> temp_max(°C): <span style="color:lightgreen">d08max</span></code>
> <br>
> <code> temp_min(°C): <span style="color:lightgreen">d08min</span></code>
> <br>
> <code> temp_max(°F): <span style="color:lightgreen">d08max -> attr(data-altT)</span></code>
> <br>
> <code> temp_min(°F): <span style="color:lightgreen">d08min -> attr(data-altT)</span></code>
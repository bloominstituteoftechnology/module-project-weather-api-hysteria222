async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  document.querySelector('#weatherWidget').style.display = 'none';
  const citySelector = document.querySelector('#citySelect');

  citySelector.addEventListener('change', async evt => {
    
    try {
    console.log(evt.target.value);
    let city = evt.target.value;
    let url = `http://localhost:3003/api/weather?city=${city}`
    citySelector.disabled = true;
    document.querySelector('.info').innerHTML = 'Fetching weather data...'

    const res = await axios.get(url)
    console.log(res.data)

    document.querySelector('.info').innerHTML = ' ';
    citySelector.disabled = false;
    document.querySelector('#weatherWidget').style.display = 'block';

    let { data } = res;
    document.querySelector('#apparentTemp div:nth-child(2)')
      .innerHTML = `${data.current.apparent_temperature}`;
    document.querySelector('#todayDescription')
      .innerHTML = descriptions.find(d => d[0] === data.current.weather_description)[1];
    document.querySelector('#todayStats div:nth-child(1)')
      .innerHTML = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
    document.querySelector('#todayStats div:nth-child(2)')
      .innerHTML = `Precipitation: ${data.current.precipitation_probability * 100}%`;
    document.querySelector('#todayStats div:nth-child(3)')
      .innerHTML = `Humidity: ${data.current.humidity}%`;
    document.querySelector('#todayStats div:nth-child(4)')
      .innerHTML = `Wind: ${data.current.wind_speed}m/s`;

    data.forecast.daily.forEach((day, idx) => {
      let card = document.querySelectorAll('.next-day')[idx];

      let weekDay = card.children[0];
      let apparent = card.children[1];
      let minMax = card.children[2];
      let precipit = card.children[3]

      weekDay.innerHTML = getWeekDay(day.date)
      apparent.innerHTML = descriptions.find(d => d[0] === data.current.weather_description)[1];
      minMax.innerHTML = `${day.temperature_min}°/${day.temperature_max}°`;
      precipit.innerHTML = `Precipitation": ${day.precipitation_probability * 100}%`;
    })
      document.querySelector('#location').firstElementChild.innerHTML = data.location.city
    } catch (err){
      console.log('Promise rejected with an error message', err.message)
    }

    function getWeekDay(date) {
      return date
    }
 
  })

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()

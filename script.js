


//interação
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//exibição
const currentTemperature = document.getElementById('current-temperature')
const currentDate = document.getElementById('current-date')
const cityName = document.getElementById('city-name')
const weathericon = document.getElementById( 'weather-icon')
const weatherDescirption = document.getElementById('weather-description')
const  windSpeed = document.getElementById('wind-speed')
const feelsLikeTemperature = document.getElementById('feels-like-temperature')
const currentHumidity = document.getElementById('current-humidity')
const sunriseTime = document.getElementById('sunrise-time')
const sunsetTime = document.getElementById('sunset-time')

const api_key = "1edea1bba7f929e9f0aebaa1dbdc787a"

citySearchButton.addEventListener('click', () =>{
  let cityName = citySearchInput.value
  getCityWeather(cityName)  
})

navigator.geolocation.getCurrentPosition(
    (position) =>{
        let lat = position.coords.latitude
        let lon = position.coords.longitude
      
        getCurrentLocationWeather(lat,lon)
      
    },
    (err) => {
        if(err.cod === 1){
            alert('Geolocalizção negada pelo usuário, busque manualmente por uma cidade atarves da barra de pesquisa.')
        }else{
            console.log(err)
        }
    }
)

function getCurrentLocationWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => (response.json())) 
    .then((data) => displayWeather(data)) 
}

function getCityWeather (cityName){

    weathericon.src= `./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => (response.json())) 
    .then((data) => displayWeather(data)) 
}

function displayWeather(data){
    let {
      dt,
      name,
      weather:[{icon, descirption}],
      main: {temp, feels_like, humidity},
      wind:{speed},
      sys:{sunrise, sunset},

    } = data
   
    currentDate.textContent = formatdate(dt),
    cityName.textContent = name,
    weathericon.src= `./assets/${icon}.svg`
    weatherDescirption.textContent =  descirption;
    currentTemperature.textContent = `${Math.round( temp)}ºC`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}ºC`;
    currentHumidity.textContent = `${Math.round(humidity)}%`
    sunriseTime.textContent =formatTime(sunrise);
    sunsetTime.textContent = formatTime( sunset) ;
}

function formatdate(epochTime){
    let date = new Date (epochTime * 1000)
    let formattedDate  =  date.toLocaleDateString('pt-BR', {month: "long", day:"numeric"})
    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime){
    let date = new Date (epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    return`${hours}:${minutes}`
}
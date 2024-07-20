const search = document.getElementById("search");
const textbox = document.getElementById("textbox");
const apiKey = "34bd25736a568a0c7a15e6f2ca12fb36";


const cityName = document.querySelector(".cityName");
const tempDisplay  = document.querySelector(".tempDisplay");
const descDisplay  = document.querySelector(".descDisplay");
const emojiDisplay = document.querySelector(".emojiDisplay");

const humidityDisplay = document.getElementById("humidityDisplay");
const grndDisplay = document.getElementById("grndDisplay");
const windDisplay = document.getElementById("windDisplay");


const Pressure = document.getElementById("Pressure");
const Feels_Like = document.getElementById("Feels_Like");
const CountryName = document.getElementById("CountryName");

const Visiblity = document.getElementById("Visiblity");
const Sea_Level = document.getElementById("Sea_Level");
const Time_Zone = document.getElementById("Time_Zone");

byDefaultData();

search.addEventListener("click" , async event => {
     
  const city = textbox.value;
  if(city){ 
      try{ 
          const weatherData =   await getWeatherInfo(city);
          displayWeather(weatherData);
      }
      catch(error){ 
         window.alert(error);
       
      }
  }
  else{ 
    window.alert("Please enter a City")
  }
    
});



async function getWeatherInfo(city){
 
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);
    if(!response.ok){
         
       throw new Error("Could not Fetch the data");

    }
    else{ 
        return response.json();
    }

}


function displayWeather(data){
   console.log(data);
   const {name: city , timezone , visibility, main:{feels_like ,grnd_level ,humidity , pressure, sea_level, temp} , weather:[{description , id}] , wind:{speed} , sys:{country}} = data;
    
   cityName.textContent = city;
   tempDisplay.textContent = `${Math.floor(temp - 273.15)}°C`;
   descDisplay.textContent = description;

   humidityDisplay.textContent = `${humidity}%`;
   grndDisplay.textContent = grnd_level;
   windDisplay.textContent = `${speed}km/hr`;
   Pressure.textContent = pressure;
  Feels_Like.textContent = feels_like;
  CountryName.textContent = country;
  Visiblity.textContent = visibility;
  Sea_Level.textContent = sea_level;
  
  let hours = Math.floor(timezone / 3600);
  let minutes = Math.floor((timezone % 3600) / 60);
  
  Time_Zone.textContent = `(${hours}:${minutes})`;

emojiDisplay.textContent = getWeatherEmoji(id);
    
}

function getWeatherEmoji(weatherId){

 switch(true){ 

    case (weatherId >=200 && weatherId <=232) : return "⛈️";
    case (weatherId >=300 && weatherId <=321) : return "🌦️";
    case (weatherId >=500 && weatherId <=531) : return "🌧️";
    case (weatherId >=600 && weatherId <=622) : return "❄️";
    case (weatherId >=700 && weatherId <=781) : return "🌫️";
    case (weatherId === 800) : return "☀️";
    case (weatherId >=801 && weatherId <=804) : return "☁️";
    default : return "?";
    
 }

}

async function byDefaultData(){
     
     cityDefault = "delhi";
     const weatherInformation = await getWeatherInfo(cityDefault);
     displayWeather(weatherInformation);
}



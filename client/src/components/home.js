import React, {useState, useEffect} from 'react'
import Searchbar from './searchbar';


const Home = () => {
    const [date,setDate] = useState(new Date());
    useEffect(() => {
        let timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    const [currentWeather, setCurrentWeather] = useState(null)
    const [favoriteForm, setFavoriteForm] = useState(false)
    const [user,setUser] = useState({email:"", favorite_city: ""})

    const getCityData = (newCityWeather) => {
        console.log("newCityWeather" , newCityWeather)
        setCurrentWeather(newCityWeather)
    }

    const handleSave = () => {
        setFavoriteForm(true)
    }

    const handleEmailInput =(e) => {
        const userEmail = e.target.value;
        console.log("checking", { ...user, email: userEmail })
        setUser({email: userEmail, favorite_city:currentWeather.name})
        console.log(user)
    }

    //A function to handle the post request
    const handleEmailInfo = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
      });
    }


  return (
    <div>
        <h2>Hi, <br/>
        Welcome to Weather App!</h2>
        <Searchbar getCityData={getCityData}/>
        
        {currentWeather? currentWeather === '404' || currentWeather === '304'  ? (
                `<p>The city of ${currentWeather.name} is not valid: Enter a valid city</p>`
            ) : 
        <div className='card'>
            <p>{date.toLocaleTimeString()} {date.toLocaleDateString()}</p>
            <button className='save' onClick= {handleSave}>Save</button>
                <img src={`/${currentWeather.weather[0].icon}.png`} alt={currentWeather.weather[0].main}/>
                    <p style={{color: "blue", fontSize: 30, }}> {currentWeather.name}</p>
                    <p>Temp: {currentWeather.main.temp}°F</p>
                    <p>Weather: {currentWeather.weather[0].main}</p>
                    <p>Temp Range: {currentWeather.main.temp_min}°F/ {currentWeather.main.temp_max}°F</p>
                    <p>Humidity: {currentWeather.main.humidity}% </p> 
        </div>: (
                <p>Please enter the city name</p>
                )
            }
            {favoriteForm ? (<div><form onSubmit={handleEmailInfo}>Saving your favorite city! <input placeholder="abc@gmail.com" type="email" required onChange={handleEmailInput}/> <input type="favorite_city" value={currentWeather.name} disabled required/><button onSubmit={handleEmailInfo}>Save as Favorite</button> </form></div>) : null}
      
    </div>

  )
}

export default Home;
import React, {useState} from 'react'

const Favorites = () => {

    const [checkUser, setCheckUser] = useState("")
    const [favoriteCityWeatherData, setFavoriteCityWeatherData] = useState(null)

    const handleEmailInput =(e) => {
        const userEmail = e.target.value;
        setCheckUser(userEmail)
        console.log("checkUser" , checkUser) 
    }

    const handleDisplayEmailInfo = async (e) => {
        e.preventDefault();
        console.log("fetch http" , `http://localhost:5000/api/users/${checkUser}`)
        return await fetch(`http://localhost:5000/api/users/${checkUser}`)
        .then(response => { return response.json()} )
        .then(data => {
            setFavoriteCityWeatherData(data)
            console.log(favoriteCityWeatherData)
        })
    }

const handleDeleteFavoriteCity = async (deleteEmail) => {
    console.log(`http://localhost:5000/api/users/${deleteEmail}`)
    let response = await fetch(`http://localhost:5000/api/users/${deleteEmail}`, {method: "DELETE"})
    console.log(response)
    window.location.reload()

}


  return (
    <div>
        <form onSubmit={handleDisplayEmailInfo}>Please enter your email to checkout your favorite city! 
            <input placeholder="abc@gmail.com" type="email" required onChange={handleEmailInput}/> 
            <button >Go!</button> 
        </form>
       
        {favoriteCityWeatherData? (
        <div className='card2'>
        <button className='save' onClick= {(e)=> handleDeleteFavoriteCity(checkUser)}>Remove</button><br/>
        <img src={`/${favoriteCityWeatherData.weather[0].icon}.png`} alt={favoriteCityWeatherData.weather[0].main}/> 
        <p style={{color: "blue", fontSize: 30, }}> {favoriteCityWeatherData.name}</p>
        <p>Temp: {favoriteCityWeatherData.main.temp}°F</p>
        <p>Weather: {favoriteCityWeatherData.weather[0].main}</p>
        <p>Temp Range: {favoriteCityWeatherData.main.temp_min}°F/ {favoriteCityWeatherData.main.temp_max}°F</p>
        <p>Humidity: {favoriteCityWeatherData.main.humidity}% </p> 
        </div>
        ): (<p>Please enter a valid input</p>)}

    </div>
  )
}

export default Favorites;

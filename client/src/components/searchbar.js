import React, {useState} from 'react'
import "./searchbar.css"

const Searchbar = (props) => {
    const [city, setCity] = useState("london")

  //A function to handle the submit request

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("city", city)
    return await fetch(`http://localhost:5000/api/current/${city}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("From the getCity Request data ", data);
        props.getCityData(data);
        setCity("")
      });
  };


  return (
    <>
     <form onSubmit={handleSubmit}>
    <div className="search">
       
        <input type="text" className="searchTerm" value={city}placeholder="Search City?" onChange={(e) => setCity(e.target.value)}/>
        <button type="submit" className="searchButton">
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>   
    </div>

    {/* <div className="options">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
            value="option1" checked />
        <label className="form-check-label" htmlFor="inlineRadio1">Celsius</label>
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
            value="option2" />
        <label className="form-check-label" htmlFor="inlineRadio2">Farenheit</label>
    </div> */}
    </form>
    </>
  )
}

export default Searchbar;
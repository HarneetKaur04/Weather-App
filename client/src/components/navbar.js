import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
    <div className='header'>
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>       
        </div>
  </div>
  );
}
export default Navbar;
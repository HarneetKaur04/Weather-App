import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./components/home"
import Favorites from "./components/favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<Favorites/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

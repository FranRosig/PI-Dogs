import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import CreatingDog from './components/CreatingDog';

function App() {
  return (
  
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/dog" element={<CreatingDog/>}/>
      </Routes>
    </div>
  
  );
}

export default App;

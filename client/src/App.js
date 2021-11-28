import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';

function App() {
  return (
  
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </div>
  
  );
}

export default App;

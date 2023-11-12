import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Time from './components/Time';
import Weather from './components/Weather';
import './App.css';
//import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navbar />}></Route>
                    <Route path="/time" element={<Time />}></Route>
                    <Route path="/weather" element={<Weather />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

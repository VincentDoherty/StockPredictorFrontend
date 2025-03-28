import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import ViewPortfolio from './components/ViewPortfolio';
import Feedback from './components/Feedback';
import Backtest from './components/Backtest';
import StockNews from './components/StockNews';
import Error from './components/Error';
import Status from './components/Status';
import Stock from "./components/Stock.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/view-portfolio" element={<ViewPortfolio />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/backtest" element={<Backtest />} />
                    <Route path="/stock-news" element={<StockNews />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Import the configured Axios instance

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            navigate('/login');
        } catch (error) {
            console.error('There was an error logging out!', error);
        }
    };

    return (
        <nav>
            <Link to="/profile">Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stock">Stock</Link>
            <Link to="/backtest">Backtest</Link>
            <Link to="/login">Login</Link>
            <Link to="/status">Status</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
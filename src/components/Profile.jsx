import axios from "axios";
import {useState} from "react";

function Profile() {
    const [riskTolerance, setRiskTolerance] = useState('');
    const [investmentPreferences, setInvestmentPreferences] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/profile', {
            risk_tolerance: riskTolerance,
            investment_preferences: investmentPreferences
        })
        .then(() => {
            setMessage('Profile updated successfully');
        })
        .catch(error => {
            console.error('There was an error updating the profile!', error);
        });
    };

    return (
        <div>
            <h1>Profile</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Risk Tolerance:</label>
                    <input
                        type="text"
                        value={riskTolerance}
                        onChange={(e) => setRiskTolerance(e.target.value)}
                    />
                </div>
                <div>
                    <label>Investment Preferences:</label>
                    <input
                        type="text"
                        value={investmentPreferences}
                        onChange={(e) => setInvestmentPreferences(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;

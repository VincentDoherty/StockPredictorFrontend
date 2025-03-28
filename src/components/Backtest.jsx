import React, { useState } from 'react';
import axios from 'axios';

const Backtest = () => {
    const [stockSymbol, setStockSymbol] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cumulativeReturns, setCumulativeReturns] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const response = await axios.post('http://localhost:5000/api/backtest', {
                stock_symbol: stockSymbol,
                start_date: startDate,
                end_date: endDate,
            });
            setCumulativeReturns(response.data.cumulative_returns);
        } catch (error) {
            console.error('Error during backtest:', error);
            setError('An error occurred during the backtest. Please try again.');
        }
    };

    return (
        <div>
            <h1>Backtest</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Stock Symbol:</label>
                    <input
                        type="text"
                        value={stockSymbol}
                        onChange={(e) => setStockSymbol(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {cumulativeReturns && (
                <div>
                    <h2>Cumulative Returns</h2>
                    <pre>{JSON.stringify(cumulativeReturns, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Backtest;
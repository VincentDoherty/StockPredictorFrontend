import React, { useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, zoomPlugin);

function Stock() {
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/stock', { stock_symbol: stockSymbol }, { withCredentials: true });
            console.log('API Response:', response.data); // Log API response
            setStockData(response.data);
            setError(null);
        } catch (err) {
            setError(`Error fetching stock data: ${err.message}`);
            setStockData(null);
        }
    };

    const getCombinedChartData = () => {
        if (!stockData || !stockData.actual_dates || !stockData.predicted_dates) return null;

        const chartData = {
            labels: [...stockData.actual_dates, ...stockData.predicted_dates],
            datasets: [
                {
                    label: 'Actual',
                    data: stockData.actual_prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Predicted',
                    data: [...Array(stockData.actual_prices.length).fill(null), ...stockData.predicted_prices],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    min: 0,
                },
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    },
                },
            },
        };

        return { data: chartData, options };
    };

    const getPredictedChartData = () => {
        if (!stockData || !stockData.predicted_dates) return null;

        const chartData = {
            labels: stockData.predicted_dates,
            datasets: [
                {
                    label: 'Predicted',
                    data: stockData.predicted_prices,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.4, // Smoother line
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    min: 0,
                },
                x: {
                    ticks: {
                        maxTicksLimit: 10, // Limit number of ticks on x-axis
                    },
                },
            },
            plugins: {
                tooltip: {
                    enabled: true, // Enable tooltips
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'xy',
                    },
                },
            },
        };

        return { data: chartData, options };
    };

    const getPercentageChangeChartData = () => {
        if (!stockData || !stockData.predicted_dates) return null;

        const lastActualPrice = stockData.actual_prices[stockData.actual_prices.length - 1];
        const prices = stockData.predicted_prices;
        const percentageChanges = prices.map((price, index) => {
            if (index === 0) return ((price - lastActualPrice) / lastActualPrice) * 100;
            return ((price - prices[index - 1]) / prices[index - 1]) * 100;
        });

        const chartData = {
            labels: stockData.predicted_dates,
            datasets: [
                {
                    label: 'Percentage Change',
                    data: percentageChanges,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        return { data: chartData, options };
    };

    return (
        <div className="stock-container">
            <h1>Stock Data</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                    className="stock-input"
                />
                <button onClick={fetchStockData} className="fetch-button">Fetch Stock Data</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {stockData && (
                <div className="chart-container">
                    <h2>{stockData.stock_symbol}</h2>
                    <Line data={getCombinedChartData()?.data} options={getCombinedChartData()?.options} />
                    <h2>Predicted Prices</h2>
                    <Line data={getPredictedChartData()?.data} options={getPredictedChartData()?.options} />
                    <h3>Percentage Change in Predicted Prices</h3>
                    <Bar data={getPercentageChangeChartData()?.data} options={getPercentageChangeChartData()?.options} />
                </div>
            )}
        </div>
    );
}

export default Stock;
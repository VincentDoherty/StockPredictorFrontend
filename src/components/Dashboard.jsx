import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [portfolioPerformances, setPortfolioPerformances] = useState({});
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        axios.get('/dashboard')
            .then(response => {
                setPortfolioPerformances(response.data.portfolio_performances);
                setRecentTransactions(response.data.recent_transactions);
            })
            .catch(error => {
                console.error('There was an error fetching the dashboard data!', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="portfolio-performances">
                <h2>Portfolio Performances</h2>
                <ul>
                    {portfolioPerformances && Object.entries(portfolioPerformances).map(([name, performance]) => (
                        <li key={name}>{name}: {performance}</li>
                    ))}
                </ul>
            </div>
            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                <ul>
                    {recentTransactions && recentTransactions.length > 0 ? (
                        recentTransactions.map((transaction, index) => (
                            <li key={index}>{transaction}</li>
                        ))
                    ) : (
                        <li>No recent transactions</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
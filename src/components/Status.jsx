import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function Status() {
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get('/status')
            .then(response => {
                setStatus(response.data.status);
            })
            .catch(error => {
                console.error('There was an error checking the login status!', error);
            });
    }, []);

    return (
        <div>
            <h1>Status</h1>
            <p>{status}</p>
        </div>
    );
}

export default Status;
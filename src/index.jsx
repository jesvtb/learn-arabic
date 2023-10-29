import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Test from './js/test';
import { Alphabet } from './js/component';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Alphabet />
    </React.StrictMode>
);

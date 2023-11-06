import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Test from './js/test';
import { Alphabet, LetterPage } from './js/component';
import { Route } from 'wouter';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Route
            path="/"
            component={Alphabet}
        />
        <Route
            path="/letter/:id"
            component={LetterPage}
        ></Route>
    </React.StrictMode>
);

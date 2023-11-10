import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Test from './js/test';
import {
    AlphabetAR,
    LetterPage,
    AlphabetGR,
    AlphabetJP,
    HomeNav,
} from './js/component';
import { Route } from 'wouter';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HomeNav />
        <Route
            path="/greek"
            component={AlphabetGR}
        />
        <Route
            path="/arabic"
            component={AlphabetAR}
        />
        <Route
            path="/japanese"
            component={AlphabetJP}
        />
        <Route
            path="/letter/:id"
            component={LetterPage}
        ></Route>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Test from './js/test';
import {
    AlphabetAR,
    LetterPage,
    AlphabetGR,
    AlphabetJP,
    AlphabetHI,
    HomeNav,
    ToggleNav,
} from './js/component';
import { Route } from 'wouter';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HomeNav />
        <ToggleNav />
        <Route
            path="/greek"
            component={AlphabetGR}
        />
        <Route
            path="/hindi"
            component={AlphabetHI}
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

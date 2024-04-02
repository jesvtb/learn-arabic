import { useEffect, useState, createContext } from 'react';
import AlphabetHI from './alphabetHI';
import AlphabetRU from './alphabetRU';
import AlphabetAR from './alphabetAR';
import AlphabetJP from './alphabetJP';
import AlphabetGR from './alphabetGR';
import { Homepage, ToggleNav, Credits } from './nav';
import axios from 'axios';

// init Context object to optinally give access to child components
export const LangItemsContext = createContext();

export default function App() {
    const [langItems, setLangItems] = useState([]);

    // making an asynchronous GET request to '/lang-config.json'.
    useEffect(() => {
        async function fetchLanguageData() {
            try {
                const response = await axios.get('/lang-config.json');

                // Once successful, update the state with data fetched from '/lang-config.json'.
                setLangItems(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchLanguageData();
    }, []);

    return (
        <>
            <LangItemsContext.Provider value={langItems}>
                <Homepage />
                <Credits />
                <ToggleNav />
                <AlphabetGR />
                <AlphabetRU />
                <AlphabetHI />
                <AlphabetJP />
                <AlphabetAR />
            </LangItemsContext.Provider>
        </>
    );
}

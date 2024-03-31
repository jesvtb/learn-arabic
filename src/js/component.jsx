import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'wouter';

// per symbolSingle__symbolmapping of languages
// ==================================================

export const getLangConfig = (items, name) => {
    const index = items.findIndex((item) => item.englishName === name);
    return index !== -1 ? items[index] : null; // Return null if not found
};

export const FetchSymbols = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const dataArray = response.data;
                if (Array.isArray(dataArray)) {
                    setData(dataArray);
                } else {
                    console.error('Fetched data is not an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]); // run effect on url change

    return data;
};

// selections components
// ==================================================

export function MapSelections({ options, defaultOption }) {
    return (
        <>
            <option
                selected
                disabled
            >
                {defaultOption}
            </option>
            {options.map((option, i) => (
                <option
                    key={i}
                    value={option}
                    className="dropdown__option"
                >
                    {option}
                </option>
            ))}
        </>
    );
}

export function SelectFont({ onSelectFont }) {
    const handleFontChange = (event) => {
        const selectedValue = event.target.value;
        onSelectFont(selectedValue);
    };

    const options = ['sans', 'serif'];

    return (
        <select
            name="selectedFont"
            onChange={handleFontChange}
            className="dropdown"
        >
            <MapSelections
                defaultOption="serif"
                options={options}
            />
        </select>
    );
}

export function SelectCase({ onSelectCase }) {
    const handleCaseChange = (event) => {
        const selectedValue = event.target.value;
        onSelectCase(selectedValue);
    };
    const options = ['lowercase', 'uppercase', 'together'];

    return (
        <select
            name="selectedCase"
            onChange={handleCaseChange}
            className="dropdown"
        >
            <MapSelections
                defaultOption="case type"
                options={options}
            />
        </select>
    );
}

export function SelectPositionAR({ onSelectPositionAR }) {
    const handlePositionChange = (event) => {
        const selectedValue = event.target.value;
        onSelectPositionAR(selectedValue);
    };
    const options = ['alone', 'initial', 'medial', 'final'];

    return (
        <select
            name="selectedForm"
            onChange={handlePositionChange}
            className="dropdown"
        >
            <MapSelections
                defaultOption="form type"
                options={options}
            />
        </select>
    );
}

export function SelectSyllabary({ onSelectSyllabary }) {
    const handleSyllabaryChange = (event) => {
        const selectedValue = event.target.value;
        onSelectSyllabary(selectedValue);
    };
    const options = ['hiragana', 'katakana', 'together'];

    return (
        <select
            name="selectedSyllabary"
            onChange={handleSyllabaryChange}
            className="dropdown"
        >
            <MapSelections
                defaultOption="syllabary group"
                options={options}
            />
        </select>
    );
}

// title component
// ==================================================

export function Title({ item }) {
    return (
        <>
            <div className="sideBar__title">{item.localName}</div>
            <div className="sideBar__title">{item.englishName}</div>
        </>
    );
}

export function symbolPage() {
    const { id } = useParams();

    return (
        <div className="symbol-page">
            <h1>Data Details Page</h1>
            <p>Display the content for id: {id}</p>
        </div>
    );
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Link, useParams } from 'wouter';

export function HomeNav() {
    return (
        <>
            <nav className="home-nav">
                <Link
                    href="/greek"
                    className="home-nav__lang"
                >
                    greek
                </Link>
                <Link
                    href="/arabic"
                    className="home-nav__lang"
                >
                    arabic
                </Link>
                <Link
                    href="/japanese"
                    className="home-nav__lang"
                >
                    japanese
                </Link>
            </nav>
        </>
    );
}

export function AlphabetJP() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedSyllabary, setSelectedSyllabary] = useState('');
    const lang = 'Japanese';
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    const handleSyllabaryChange = (selectedValue) => {
        setSelectedSyllabary(selectedValue);
    };
    return (
        <>
            <div className="lang-header">
                <Title lang={lang} />
                <div className="selection-area">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectSyllabary
                        onSelectSyllabary={handleSyllabaryChange}
                    />
                </div>
            </div>
            <MapLettersJP
                selectedFont={selectedFont}
                selectedSyllabary={selectedSyllabary}
            />
        </>
    );
}

export function AlphabetGR() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedCase, setSelectedCase] = useState('');
    const lang = 'Greek';
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    const handleCaseChange = (selectedValue) => {
        setSelectedCase(selectedValue);
    };
    return (
        <>
            <div className="lang-header">
                <Title lang={lang} />
                <div className="selection-area">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectCase onSelectCase={handleCaseChange} />
                </div>
            </div>
            <MapLettersGR
                selectedFont={selectedFont}
                selectedCase={selectedCase}
            />
        </>
    );
}

export function AlphabetAR() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const lang = 'Arabic';
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    const handlePositionChange = (selectedValue) => {
        setSelectedForm(selectedValue);
    };

    return (
        <>
            <div className="lang-header">
                <Title lang={lang} />
                <div className="selection-area">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectPositionAR
                        onSelectPositionAR={handlePositionChange}
                    />
                </div>
            </div>
            <MapLettersAR
                selectedFont={selectedFont}
                selectedForm={selectedForm}
            />
        </>
    );
}

// per single-letter__lettermapping of languages
// ==================================================

function MapLettersGR({ selectedFont, selectedCase }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./alphabet-GR.json');
                const lettersData = response.data;
                if (Array.isArray(lettersData)) {
                    setLetters(lettersData);
                } else {
                    console.error('AlphabetGR data is not an array');
                }
            } catch (error) {
                console.error('Error fetching alphabet data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="letters">
                {letters.map((letter, i) => {
                    return (
                        <div
                            key={i}
                            className={`single-letter`}
                        >
                            <Link to={`/greek/letter/${letter.id}`}>
                                <h1
                                    className={`single-letter__letter lang-gr ${selectedFont} ${selectedCase}`}
                                >
                                    <span>{letter.alphabet}</span>
                                    <span>{letter.alphabet}</span>
                                </h1>
                                <div className="single-letter__notation-grp">
                                    <p className="single-letter__order-num">
                                        {letter.id}
                                    </p>
                                </div>
                            </Link>
                            <div className="single-letter__tooltip-grp">
                                <div className="letter-form">
                                    <h2 className="letter-form__base-lang">
                                        latin name
                                    </h2>
                                    <h2 className="letter-form__base-lang">
                                        {letter.latinName}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function MapLettersJP({ selectedFont, selectedSyllabary }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./alphabet-JP.json');
                const lettersData = response.data;
                if (Array.isArray(lettersData)) {
                    setLetters(lettersData);
                } else {
                    console.error('AlphabetJP data is not an array');
                }
            } catch (error) {
                console.error('Error fetching alphabet data:', error);
            }
        };

        fetchData();
    }, []);

    const groupedLetters = {};
    letters.forEach((letter) => {
        const phoneticGroup = letter.phoneticgroup;
        if (!groupedLetters[phoneticGroup]) {
            groupedLetters[phoneticGroup] = [];
        }
        groupedLetters[phoneticGroup].push(letter);
    });

    return (
        <>
            <div className="letters lang-jp">
                {Object.entries(groupedLetters).map(
                    ([phoneticGroup, letters]) => (
                        <div
                            key={phoneticGroup}
                            className={`phonetics ${phoneticGroup}`}
                        >
                            {/* <h2 className="base-lang">{phoneticGroup}</h2> */}
                            {letters.map((letter, i) => (
                                <div
                                    key={i}
                                    className={`single-letter`}
                                >
                                    <Link to={`/japanese/letter/${letter.id}`}>
                                        <h1
                                            className={`single-letter__letter lang-jp ${selectedFont} ${selectedSyllabary}`}
                                        >
                                            <span>{letter.hiragana}</span>
                                            <span>{letter.katakana}</span>
                                        </h1>
                                        <div className="single-letter__notation-grp">
                                            <p className="single-letter__order-num">
                                                {letter.id}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="single-letter__tooltip-grp">
                                        <div className="letter-form">
                                            <h2 className="letter-form__base-lang">
                                                latin name
                                            </h2>
                                            <h2 className="letter-form__base-lang">
                                                {letter.romaji}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            ;
                        </div>
                    )
                )}
            </div>
        </>
    );
}

function MapLettersAR({ selectedFont, selectedForm }) {
    const [letters, setLetters] = useState([]);
    const forms = ['initial', 'medial', 'final'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./alphabet-AR.json');
                const lettersData = response.data;
                if (Array.isArray(lettersData)) {
                    setLetters(lettersData);
                } else {
                    console.error('AlphabetAR data is not an array');
                }
            } catch (error) {
                console.error('Error fetching alphabet data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="letters lang-ar">
                {letters.map((letter, i) => {
                    const formgroup = letter.formgroup;
                    const html = marked.parse(letter.medialinword);

                    return (
                        <div
                            key={i}
                            className={`single-letter ${formgroup}`}
                        >
                            <Link
                                to={`/arabic/letter/${letter.id}`}
                                // href={`/letter/${letter.id}`}
                                // onClick={redirectToPage()}
                            >
                                <h1
                                    className={`single-letter__letter lang-ar ${selectedFont} ${selectedForm}`}
                                >
                                    <span>ـ</span>
                                    {letter.alphabet}
                                    <span>ـ</span>
                                </h1>
                                <div className="single-letter__notation-grp">
                                    <p className="single-letter__order-num">
                                        {letter.id}
                                    </p>
                                </div>
                            </Link>
                            <div className="single-letter__tooltip-grp">
                                {forms.map((form, i) => (
                                    <div
                                        key={i}
                                        className="letter-form"
                                    >
                                        <h2 className="letter-form__base-lang">
                                            {form}
                                        </h2>
                                        <h2
                                            className={`letter-form__set ${form}`}
                                        >
                                            <span>ـ</span>
                                            {letter.alphabet}
                                            <span>ـ</span>
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

// selection-area components
// ==================================================

function MapSelections({ options, defaultOption }) {
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

function SelectFont({ onSelectFont }) {
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
                defaultOption="font type"
                options={options}
            />
        </select>
    );
}

function SelectCase({ onSelectCase }) {
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

function SelectPositionAR({ onSelectPositionAR }) {
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

function SelectSyllabary({ onSelectSyllabary }) {
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

function Title({ lang }) {
    return <div className="base-lang title">{lang} alphabet basics</div>;
}

export function LetterPage() {
    const { id } = useParams();

    return (
        <div className="letter-page">
            <h1>Data Details Page</h1>
            <p>Display the content for id: {id}</p>
        </div>
    );
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Link, useParams } from 'wouter';

const langItems = [
    {
        slug: '/arabic',
        englishName: 'arabic',
        localName: 'العربية',
        call2action: false,
        abbreviation: 'ar',
    },
    {
        slug: '/japanese',
        englishName: 'japanese',
        localName: '日本語',
        call2action: false,
        abbreviation: 'jp',
    },
    {
        slug: '/greek',
        englishName: 'greek',
        localName: 'Ελληνικά',
        call2action: false,
        abbreviation: 'gr',
    },
];

export function HomeNav() {
    return (
        <div className="homeNav">
            {langItems.map((item, i) => (
                <Link
                    to={item.slug}
                    key={i}
                    className="homeNav__link"
                >
                    <p
                        className={`homeNav__localName homeNav__localName--${item.abbreviation}`}
                    >
                        {item.localName}
                    </p>
                    <p className="homeNav__englishName">{item.englishName}</p>
                </Link>
            ))}
        </div>
    );
}

export function ToggleNav() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleButtonClick = () => {
        setIsToggled(!isToggled);
    };

    return (
        <>
            <div
                onClick={handleToggle}
                className="navToggle"
            >
                <svg
                    className={`navToggle__icon ${
                        isToggled ? 'navToggle__icon--open' : ''
                    }`}
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                >
                    <path d="M 20,29 H 80" />
                    <path d="M 20,50 H 60" />
                    <path d="M 20,71 H 80" />
                </svg>
            </div>
            <nav
                className={`toggleNav ${isToggled ? 'toggleNav--open' : ''}`}
                style={{ display: isToggled ? '' : 'none' }}
            >
                {langItems.map((item, i) => (
                    <Link
                        to={item.slug}
                        key={i}
                        onClick={handleButtonClick}
                        className="toggleNav__link"
                    >
                        {item.localName}
                    </Link>
                ))}
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
            <div className="selectPanel">
                <Title lang={lang} />
                <div className="selectPanel__selections">
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
            <div className="selectPanel">
                <Title lang={lang} />
                <div className="selectPanel__selections">
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
            <div className="selectPanel">
                <Title lang={lang} />
                <div className="selectPanel__selections">
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

// per letterSingle__lettermapping of languages
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
            <div className="lettersPanel lang-gr">
                {letters.map((letter, i) => {
                    return (
                        <div
                            key={i}
                            className={`letterSingle`}
                        >
                            <Link to={`/greek/letter/${letter.id}`}>
                                <h1
                                    className={`letterSingle__letter lang-gr lang-gr--${selectedFont} ${selectedCase}`}
                                >
                                    <span>{letter.alphabet}</span>
                                    <span>{letter.alphabet}</span>
                                </h1>
                                <div className="letterSingle__notationWrp">
                                    <p className="letterSingle__letterOrder">
                                        {letter.id}
                                    </p>
                                </div>
                            </Link>
                            <div className="letterSingle__tooltipWrp">
                                <div className="letterMorph__wrapper">
                                    <h2 className="letterMorph__morphType">
                                        latin name
                                    </h2>
                                    <h2 className="letterMorph__morphType">
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
            <div className="lettersPanel lang-jp">
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
                                    className={`letterSingle`}
                                >
                                    <Link to={`/japanese/letter/${letter.id}`}>
                                        <h1
                                            className={`letterSingle__letter lang-jp lang-jp--${selectedFont} ${selectedSyllabary}`}
                                        >
                                            <span>{letter.hiragana}</span>
                                            <span>{letter.katakana}</span>
                                        </h1>
                                        <div className="letterSingle__notationWrp">
                                            <p className="letterSingle__letterOrder">
                                                {letter.id}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="letterSingle__tooltipWrp">
                                        <div className="letterMorph__wrapper">
                                            <h2 className="letterMorph__morphType">
                                                latin name
                                            </h2>
                                            <h2 className="letterMorph__morphType">
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
            <div className="lettersPanel lang-ar">
                {letters.map((letter, i) => {
                    const formgroup = letter.formgroup;
                    const html = marked.parse(letter.medialinword);

                    return (
                        <div
                            key={i}
                            className={`letterSingle ${formgroup}`}
                        >
                            <Link
                                to={`/arabic/letter/${letter.id}`}
                                // href={`/letter/${letter.id}`}
                                // onClick={redirectToPage()}
                            >
                                <h1
                                    className={`letterSingle__letter lang-ar lang-ar--${selectedFont} ${selectedForm}`}
                                >
                                    <span>ـ</span>
                                    {letter.alphabet}
                                    <span>ـ</span>
                                </h1>
                                <div className="letterSingle__notationWrp">
                                    <p className="letterSingle__letterOrder">
                                        {letter.id}
                                    </p>
                                </div>
                            </Link>
                            <div className="letterSingle__tooltipWrp">
                                {forms.map((form, i) => (
                                    <div
                                        key={i}
                                        className="letterMorph__wrapper"
                                    >
                                        <h2 className="letterMorph__morphType">
                                            {form}
                                        </h2>
                                        <h2
                                            className={`letterMorph__morphedForm ${form}`}
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

// selections components
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
                defaultOption="serif"
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
    return <div className="selectPanel__title">{lang} alphabet basics</div>;
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

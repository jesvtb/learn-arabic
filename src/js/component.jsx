import axios from 'axios';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Link, useLocation, Route, useParams } from 'wouter';

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
            <div className="menu">
                <Title lang={lang} />
                <div className="selection">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectCase onSelectCase={handleCaseChange} />
                </div>
                <Title lang={lang} />
                <div className="selection">
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
            <div className="letters-wrapper">
                {letters.map((letter, i) => {
                    return (
                        <div
                            key={i}
                            className={`letter-group`}
                        >
                            <Link to={`/greek/letter/${letter.id}`}>
                                <h1
                                    className={`letter-base lang-gr ${selectedFont} ${selectedCase}`}
                                >
                                    <span>{letter.alphabet}</span>
                                    <span>{letter.alphabet}</span>
                                </h1>
                            </Link>
                        </div>
                    );
                })}
            </div>
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

    const handleFormChange = (selectedValue) => {
        setSelectedForm(selectedValue);
    };

    return (
        <>
            <div className="menu">
                <Title lang={lang} />
                <div className="selection">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectPositionAR onSelectPositionAR={handleFormChange} />
                </div>
                <Title lang={lang} />
                <div className="selection">
                    <SelectFont onSelectFont={handleFontChange} />
                    <SelectPositionAR onSelectPositionAR={handleFormChange} />
                </div>
            </div>
            <MapLettersAR
                selectedFont={selectedFont}
                selectedForm={selectedForm}
            />
        </>
    );
}

function MapLettersAR({ selectedFont, selectedForm }) {
    const [letters, setLetters] = useState([]);

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
            <div className="letters-wrapper lang-ar">
                {letters.map((letter, i) => {
                    const formgroup = letter.formgroup;
                    const html = marked.parse(letter.medialinword);

                    return (
                        <div
                            key={i}
                            className={`letter-group ${formgroup}`}
                        >
                            <Link
                                to={`/arabic/letter/${letter.id}`}
                                // href={`/letter/${letter.id}`}
                                // onClick={redirectToPage()}
                            >
                                <h1
                                    className={`letter-base lang-ar ${selectedFont} ${selectedForm}`}
                                >
                                    <span>ـ</span>
                                    {letter.alphabet}
                                    <span>ـ</span>
                                </h1>
                            </Link>

                            <div className="tooltip">
                                <div className="form group">
                                    <h2 className="base-lang">initial</h2>
                                    <h2 className="lang-ar">
                                        <span>ـ</span>
                                        {letter.alphabet}
                                        <span>ـ</span>
                                    </h2>
                                    <h2
                                        className="form-in-word lang-ar"
                                        dangerouslySetInnerHTML={{
                                            __html: html,
                                        }}
                                    ></h2>
                                </div>
                                <div className="form group">
                                    <h2 className="base-lang">medial</h2>
                                    <h2 className="lang-ar">
                                        <span>ـ</span>
                                        {letter.alphabet}
                                        <span>ـ</span>
                                    </h2>
                                </div>
                                <div className="form group">
                                    <h2 className="base-lang">final</h2>
                                    <h2 className="lang-ar">
                                        <span>ـ</span>
                                        {letter.alphabet}
                                        <span>ـ</span>
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

function SelectFont({ onSelectFont }) {
    const handleFontChange = (event) => {
        const selectedValue = event.target.value;
        onSelectFont(selectedValue);
    };

    return (
        <label>
            {/* <p className="base-lang">select font type</p> */}
            {/* <p className="base-lang">select font type</p> */}
            <select
                name="selectedFont"
                onChange={handleFontChange}
                className="base-lang"
            >
                <option
                    selected
                    disabled
                >
                    font type
                </option>
                className="base-lang" >
                <option
                    selected
                    disabled
                >
                    font type
                </option>
                <option
                    selected
                    disabled
                >
                    font type
                </option>
                <option value="serif">serif</option>
                <option value="sans">sans</option>
            </select>
        </label>
    );
}

function SelectCase({ onSelectCase }) {
    const handleCaseChange = (event) => {
        const selectedValue = event.target.value;
        onSelectCase(selectedValue);
    };

    return (
        <label>
            {/* <p className="base-lang">select case type</p> */}
            {/* <p className="base-lang">select case type</p> */}
            <select
                name="selectedCase"
                onChange={handleCaseChange}
                className="base-lang"
            >
                <option
                    selected
                    disabled
                >
                    display case
                </option>
                className="base-lang" >
                <option
                    selected
                    disabled
                >
                    display case
                </option>
                className="base-lang" >
                <option
                    selected
                    disabled
                >
                    display case
                </option>
                <option value="lowercase">lowecase</option>
                <option value="uppercase">uppercase</option>
                <option value="together">together</option>
            </select>
        </label>
    );
}

function SelectPositionAR({ onSelectPositionAR }) {
    const handleFormChange = (event) => {
        const selectedValue = event.target.value;
        onSelectPositionAR(selectedValue);
    };

    return (
        <label>
            {/* <p className="base-lang">select form type</p> */}
            {/* <p className="base-lang">select form type</p> */}
            <select
                name="selectedForm"
                onChange={handleFormChange}
                className="base-lang"
            >
                <option
                    selected
                    disabled
                >
                    position
                </option>
                className="base-lang" >
                <option
                    selected
                    disabled
                >
                    position
                </option>
                className="base-lang" >
                <option
                    selected
                    disabled
                >
                    position
                </option>
                <option value="alone">alone</option>
                <option value="initial">initial</option>
                <option value="medial">medial</option>
                <option value="final">final</option>
            </select>
        </label>
    );
}

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

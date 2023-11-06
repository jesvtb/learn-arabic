import axios from 'axios';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Link, useLocation, Route, useParams } from 'wouter';

export function Alphabet() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedForm, setSelectedForm] = useState('');

    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    const handleFormChange = (selectedValue) => {
        setSelectedForm(selectedValue);
    };

    return (
        <>
            <Title />
            <div className="menu">
                <SelectFont onSelectFont={handleFontChange} />
                <SelectForm onSelectForm={handleFormChange} />
            </div>
            <MapLetters
                selectedFont={selectedFont}
                selectedForm={selectedForm}
            />
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
            <p className="base-lang">select font type</p>
            <select
                name="selectedFont"
                onChange={handleFontChange}
            >
                <option value="serif">serif</option>
                <option value="sans">sans</option>
            </select>
        </label>
    );
}

function SelectForm({ onSelectForm }) {
    const handleFormChange = (event) => {
        const selectedValue = event.target.value;
        onSelectForm(selectedValue);
    };

    return (
        <label>
            <p className="base-lang">select form type</p>
            <select
                name="selectedForm"
                onChange={handleFormChange}
            >
                <option value="alone">alone</option>
                <option value="initial">initial</option>
                <option value="medial">medial</option>
                <option value="final">final</option>
            </select>
        </label>
    );
}

function Title() {
    return <div className="base-lang title">arabic alphabet basics</div>;
}

function MapLetters({ selectedFont, selectedForm }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./alphabet.json');
                const lettersData = response.data;
                if (Array.isArray(lettersData)) {
                    setLetters(lettersData);
                } else {
                    console.error('Alphabet data is not an array');
                }
            } catch (error) {
                console.error('Error fetching alphabet data:', error);
            }
        };

        fetchData();
    }, []);

    const [, navigate] = useLocation();

    return (
        <>
            <div className="letters-wrapper">
                {letters.map((letter, i) => {
                    const formgroup = letter.formgroup;
                    const html = marked.parse(letter.medialinword);

                    return (
                        <div
                            key={i}
                            className={`letter-group ${formgroup}`}
                        >
                            <Link
                                to={`/letter/${letter.id}`}
                                // href={`/letter/${letter.id}`}
                                // onClick={redirectToPage()}
                            >
                                <h1
                                    className={`letter-base target-lang ${selectedFont} ${selectedForm}`}
                                >
                                    <span>ـ</span>
                                    {letter.alphabet}
                                    <span>ـ</span>
                                </h1>
                            </Link>

                            <div className="tooltip">
                                <div className="form group">
                                    <h2 className="base-lang">initial</h2>
                                    <h2 className="target-lang">
                                        <span>ـ</span>
                                        {letter.alphabet}
                                        <span>ـ</span>
                                    </h2>
                                    <h2
                                        className="form-in-word target-lang"
                                        dangerouslySetInnerHTML={{
                                            __html: html,
                                        }}
                                    ></h2>
                                </div>
                                <div className="form group">
                                    <h2 className="base-lang">medial</h2>
                                    <h2 className="target-lang">
                                        <span>ـ</span>
                                        {letter.alphabet}
                                        <span>ـ</span>
                                    </h2>
                                </div>
                                <div className="form group">
                                    <h2 className="base-lang">final</h2>
                                    <h2 className="target-lang">
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

export function LetterPage() {
    const { id } = useParams();

    return (
        <div className="letter-page">
            <h1>Data Details Page</h1>
            <p>Display the content for id: {id}</p>
        </div>
    );
}

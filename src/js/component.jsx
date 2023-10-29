import axios from 'axios';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export function Alphabet() {
    const [selectedFont, setSelectedFont] = useState('');

    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    return (
        <>
            <SelectFont onSelectFont={handleFontChange} />
            <MapLetters selectedFont={selectedFont} />
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
            select font type
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

function MapLetters({ selectedFont }) {
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

    return (
        <>
            <div className="base-lang title">arabic alphabet basics</div>
            <div className="letters-wrapper">
                {letters.map((letter, i) => {
                    const formgroup = letter.formgroup;
                    const html = marked.parse(letter.medialinword);

                    return (
                        <div
                            key={i}
                            className={`letter-group ${formgroup}`}
                        >
                            <a href="">
                                <h1
                                    className={`letter-base target-lang ${selectedFont}`}
                                >
                                    {letter.alphabet}
                                </h1>
                            </a>

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

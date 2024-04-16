import { Route, Link } from 'wouter';
import { useState, useContext, useEffect } from 'react';
import { SelectFont } from './component';
import axios from 'axios';

const RootEmphasizer = ({ words, root }) => {
    const rootNormalized = root.normalize('NFC');
    const word = 'fotografía';
    // const wordNormalized = word.normalize('NFD');
    console.log(word.normalize('NFC'));
    // consolel
    // const wordsNormalized = words.map((w) => w.normalize('NFC'));
    // console.log(wordsNormalized);
    return (
        <ul className="RootCard__examples">
            {words.map((word, i) => (
                <li
                    key={i}
                    className="RootCard__example"
                >
                    {word.split('').map((char, index) => {
                        // const rootIndex = word.indexOf(root);
                        // console.log(rootIndex);

                        if (
                            index <= word.length - rootNormalized.length &&
                            word
                                .slice(index, index + rootNormalized.length)
                                .normalize('NFC') === rootNormalized
                        ) {
                            // const previous =
                            // console.log(word.slice(0, index));
                            const prefix = word.slice(0, index);
                            const suffix = word.slice(
                                index + root.length,
                                word.length
                            );
                            return (
                                <>
                                    {prefix}
                                    <em key={index}>{root}</em>
                                    {suffix}
                                </>
                            );
                        }
                        // return word;
                    })}
                </li>
            ))}
        </ul>
    );
};

const root = 'graph';
const words = ['graphic', 'photography', 'autograph'];

const RootVariations = ({ variation, i }) => {
    const examples = variation.examples;
    const root = variation.form && variation.form.trim();
    const lang = variation.lang;
    // console.log(root.length);
    // if (!root || !examples) {
    //     console.log('no root or examples');
    // }
    return (
        <div
            key={i}
            className="RootCard__variation"
        >
            <p className="RootCard__lang">{lang}</p>
            <p className="RootCard__root">{root}</p>
            <RootEmphasizer
                root={root}
                words={examples}
            />
        </div>
    );
};

const RootCard = ({ root, index }) => {
    const variations = root.variations;
    return (
        <div
            key={index}
            className="RootCard__rootWrapper"
        >
            <p className="RootCard__meaning">{root.origin_meaning}</p>
            <div className="RootCard__variations">
                {root.variations.map((variation, i) => (
                    <RootVariations
                        variation={variation}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default function RootsEuropean() {
    const [selectedFont, setSelectedFont] = useState('serif');
    // const [selectedForm, setSelectedForm] = useState('alone');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    const [data, setData] = useState([]);
    const url = './roots-european.json';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                console.log(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]);

    // return data

    //         };

    return (
        <Route path="/roots">
            {/* <RootEmphasizer
                words={words}
                root={root}
            /> */}
            <div className="sideBar">
                <h2 className="sideBar__meaning">hidden</h2>
                <div className="sideBar__selections">
                    <SelectFont onSelectFont={handleFontChange} />
                </div>
            </div>

            <div className="RootCard__wrapper">
                {data.map((root, i) => {
                    return (
                        <RootCard
                            key={i}
                            root={root}
                        />
                    );
                })}
            </div>
        </Route>
    );
}

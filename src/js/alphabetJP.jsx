import { useState, useContext } from 'react';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';
import {
    SelectFont,
    SelectSyllabary,
    Title,
    getLangConfig,
    FetchSymbols,
} from './component';

export default function AlphabetJP() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedSyllabary, setSelectedSyllabary] = useState('');
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'japanese');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    const handleSyllabaryChange = (selectedValue) => {
        setSelectedSyllabary(selectedValue);
    };
    return (
        <>
            {item && (
                <Route path={item.slug}>
                    <div className="sideBar">
                        <Title item={item} />
                        <div className="sideBar__selections">
                            <SelectFont onSelectFont={handleFontChange} />
                            <SelectSyllabary
                                onSelectSyllabary={handleSyllabaryChange}
                            />
                        </div>
                    </div>
                    <MapsymbolsJP
                        selectedFont={selectedFont}
                        selectedSyllabary={selectedSyllabary}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsJP({ selectedFont, selectedSyllabary }) {
    const symbols = FetchSymbols('./alphabet-JP.json');

    const groupedsymbols = {};
    symbols.forEach((symbol) => {
        const phoneticGroup = symbol.phoneticgroup;
        if (!groupedsymbols[phoneticGroup]) {
            groupedsymbols[phoneticGroup] = [];
        }
        groupedsymbols[phoneticGroup].push(symbol);
    });

    return (
        <>
            <div className="symbolsPanel lang-jp">
                {Object.entries(groupedsymbols).map(
                    ([phoneticGroup, symbols]) => (
                        <div
                            key={phoneticGroup}
                            className={`phonetics ${phoneticGroup}`}
                        >
                            {/* <h2 className="base-lang">{phoneticGroup}</h2> */}
                            {symbols.map((symbol, i) => (
                                <div
                                    key={i}
                                    className={`symbolSingle`}
                                >
                                    <Link to={`/japanese/symbol/${symbol.id}`}>
                                        <h1
                                            className={`symbolSingle__symbol lang-jp lang-jp--${selectedFont} ${selectedSyllabary}`}
                                        >
                                            <span>{symbol.hiragana}</span>
                                            <span>{symbol.katakana}</span>
                                        </h1>
                                        <div className="symbolSingle__notationWrp">
                                            <p className="symbolSingle__symbolOrder">
                                                {symbol.id}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="symbolSingle__tooltipWrp">
                                        <div className="symbolMorph__wrapper">
                                            <h2 className="symbolMorph__morphType">
                                                latin name
                                            </h2>
                                            <h2 className="symbolMorph__morphType">
                                                {symbol.romaji}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </>
    );
}

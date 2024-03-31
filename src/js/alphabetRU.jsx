import { useState, useContext } from 'react';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';
import {
    SelectFont,
    SelectCase,
    Title,
    getLangConfig,
    FetchSymbols,
} from './component';

export default function AlphabetRU() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedCase, setSelectedCase] = useState('');
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'russian');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    const handleCaseChange = (selectedValue) => {
        setSelectedCase(selectedValue);
    };
    return (
        <>
            {item && (
                <Route path={item.slug}>
                    <div className="sideBar">
                        <Title item={item} />
                        <div className="sideBar__selections">
                            <SelectFont onSelectFont={handleFontChange} />
                            <SelectCase onSelectCase={handleCaseChange} />
                        </div>
                    </div>
                    <MapsymbolsRU
                        selectedFont={selectedFont}
                        selectedCase={selectedCase}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsRU({ selectedFont, selectedCase }) {
    const symbols = FetchSymbols('./alphabet-RU.json');

    return (
        <>
            <div className="symbolsPanel lang-gr">
                {symbols.map((symbol, i) => {
                    return (
                        <div
                            key={i}
                            className={`symbolSingle`}
                        >
                            <Link to={`/russian/symbol/${symbol.id}`}>
                                <h1
                                    className={`symbolSingle__symbol lang-gr lang-gr--${selectedFont} ${selectedCase}`}
                                >
                                    <span>{symbol.alphabet}</span>
                                    <span>{symbol.alphabet}</span>
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
                                        {symbol.latin}
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

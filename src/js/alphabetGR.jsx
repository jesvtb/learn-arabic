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

export default function AlphabetGR() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedCase, setSelectedCase] = useState('');
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'greek');

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
                    <MapsymbolsGR
                        selectedFont={selectedFont}
                        selectedCase={selectedCase}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsGR({ selectedFont, selectedCase }) {
    const symbols = FetchSymbols('./alphabet-GR.json');

    return (
        <>
            <div className="symbolsPanel lang-gr">
                {symbols.map((symbol, i) => {
                    return (
                        <div
                            key={i}
                            className={`symbolSingle`}
                        >
                            <Link to={`/greek/symbol/${symbol.id}`}>
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
                                        {symbol.latinName}
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

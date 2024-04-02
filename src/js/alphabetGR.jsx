import { useState, useContext } from 'react';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';
import {
    SelectFont,
    SelectCase,
    Title,
    getLangConfig,
    FetchSymbols,
    ShowPhonetics,
} from './component';

export default function AlphabetGR() {
    const [selectedFont, setSelectedFont] = useState('serif');
    const [selectedCase, setSelectedCase] = useState('together');
    const [showIPA, setShowIPA] = useState(false);
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'greek');

    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    const handleCaseChange = (selectedValue) => {
        setSelectedCase(selectedValue);
    };
    const handlePhoneticsChange = (newValue) => {
        setShowIPA(newValue); // Update the local state.
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
                            <ShowPhonetics
                                onPhoneticsShown={handlePhoneticsChange}
                            />
                        </div>
                    </div>
                    <MapsymbolsGR
                        selectedFont={selectedFont}
                        selectedCase={selectedCase}
                        showIPA={showIPA}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsGR({ selectedFont, selectedCase, showIPA }) {
    const symbols = FetchSymbols('./alphabet-GR.json');

    return (
        <>
            <div className="symbolsPanel lang__gr">
                {symbols.map((symbol, i) => {
                    return (
                        <div
                            key={i}
                            className={`symbolSingle`}
                        >
                            <Link to={`/greek/symbol/${symbol.id}`}>
                                <h1
                                    className={`symbolSingle__symbol lang__gr lang__gr--${selectedFont} ${selectedCase}`}
                                >
                                    <span>{symbol.alphabet}</span>
                                    <span>{symbol.alphabet}</span>
                                </h1>
                                <div className="symbolSingle__notationWrp">
                                    {showIPA && ( // Render IPA if showIPA is true
                                        <p className="symbolSingle__phonetics symbolSingle__phonetics--visible">
                                            {symbol.ipa}
                                        </p>
                                    )}
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

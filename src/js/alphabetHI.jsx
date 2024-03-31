import { useState, useContext } from 'react';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';
import { SelectFont, Title, getLangConfig, FetchSymbols } from './component';

export default function AlphabetHI() {
    const [selectedFont, setSelectedFont] = useState('');
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'hindi');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };
    return (
        <>
            {item && (
                <Route path={item.slug}>
                    <div className="sideBar">
                        <Title item={item} />
                        <div className="sideBar__selections">
                            <SelectFont onSelectFont={handleFontChange} />
                        </div>
                    </div>
                    <MapsymbolsHI selectedFont={selectedFont} />
                </Route>
            )}
        </>
    );
}

function MapsymbolsHI({ selectedFont }) {
    const symbols = FetchSymbols('./alphabet-HI.json');

    return (
        <>
            <div className="symbolsPanel lang-hi">
                {symbols.map((symbol, i) => {
                    const phoneticgroup = symbol.phoneticgroup;
                    return (
                        <div
                            key={i}
                            className={`symbolSingle ${phoneticgroup}`}
                        >
                            <Link to={`/hindi/symbol/${symbol.id}`}>
                                <h1
                                    className={`symbolSingle__symbol lang-hi lang-hi--${selectedFont}`}
                                >
                                    <span>{symbol.form}</span>
                                </h1>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

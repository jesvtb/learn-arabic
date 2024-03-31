import { useState, useContext } from 'react';
import { marked } from 'marked';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';
import {
    SelectFont,
    SelectPositionAR,
    Title,
    getLangConfig,
    FetchSymbols,
} from './component';

export default function AlphabetAR() {
    const [selectedFont, setSelectedFont] = useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'arabic');
    const lang = 'Arabic';
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    const handlePositionChange = (selectedValue) => {
        setSelectedForm(selectedValue);
    };

    return (
        <>
            {item && (
                <Route path={item.slug}>
                    <div className="sideBar">
                        <Title item={item} />
                        <div className="sideBar__selections">
                            <SelectFont onSelectFont={handleFontChange} />
                            <SelectPositionAR
                                onSelectPositionAR={handlePositionChange}
                            />
                        </div>
                    </div>
                    <MapsymbolsAR
                        selectedFont={selectedFont}
                        selectedForm={selectedForm}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsAR({ selectedFont, selectedForm }) {
    const forms = ['initial', 'medial', 'final'];
    const symbols = FetchSymbols('./alphabet-AR.json');

    return (
        <>
            <div className="symbolsPanel lang-ar">
                {symbols.map((symbol, i) => {
                    const formgroup = symbol.formgroup;
                    const html = marked.parse(symbol.medialinword);

                    return (
                        <div
                            key={i}
                            className={`symbolSingle ${formgroup}`}
                        >
                            <Link
                                to={`/arabic/symbol/${symbol.id}`}
                                // href={`/symbol/${symbol.id}`}
                                // onClick={redirectToPage()}
                            >
                                <h1
                                    className={`symbolSingle__symbol lang-ar lang-ar--${selectedFont} ${selectedForm}`}
                                >
                                    <span>ـ</span>
                                    {symbol.alphabet}
                                    <span>ـ</span>
                                </h1>
                                <div className="symbolSingle__notationWrp">
                                    <p className="symbolSingle__symbolOrder">
                                        {symbol.id}
                                    </p>
                                </div>
                            </Link>
                            <div className="symbolSingle__tooltipWrp lang-ar">
                                {forms.map((form, i) => (
                                    <div
                                        key={i}
                                        className="symbolMorph__wrapper"
                                    >
                                        <h2 className="symbolMorph__morphType">
                                            {form}
                                        </h2>
                                        <h2
                                            className={`symbolMorph__morphedForm ${form}`}
                                        >
                                            <span>ـ</span>
                                            {symbol.alphabet}
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

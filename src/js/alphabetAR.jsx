import { Route, Link } from 'wouter';
import { useState, useContext } from 'react';
import { LangItemsContext } from './app';
import {
    SelectFont,
    SelectPositionAR,
    Title,
    getLangConfig,
    FetchSymbols,
    ShowPhonetics,
} from './component';

export default function AlphabetAR() {
    const [selectedFont, setSelectedFont] = useState('serif');
    const [selectedForm, setSelectedForm] = useState('alone');
    const [showIPA, setShowIPA] = useState(false);
    const langItems = useContext(LangItemsContext);
    const item = getLangConfig(langItems, 'arabic');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    const handlePositionChange = (selectedValue) => {
        setSelectedForm(selectedValue);
    };
    const handlePhoneticsChange = (newValue) => {
        setShowIPA(newValue); // Update the local state.
    };
    // const langClass = item.acronym;
    // console.log({item.acronym});

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
                            <ShowPhonetics
                                onPhoneticsShown={handlePhoneticsChange}
                            />
                        </div>
                    </div>
                    <MapsymbolsAR
                        selectedFont={selectedFont}
                        selectedForm={selectedForm}
                        showIPA={showIPA}
                        langClass={item.acronym}
                    />
                </Route>
            )}
        </>
    );
}

function MapsymbolsAR({ selectedFont, selectedForm, showIPA, langClass }) {
    const forms = ['initial', 'medial', 'final'];
    const symbols = FetchSymbols('./alphabet-AR.json');
    console.log(langClass);

    return (
        <>
            <div className={`symbolsPanel lang__${langClass}`}>
                {symbols.map((symbol, i) => {
                    const formgroup = symbol.formgroup;
                    // const html = marked.parse(symbol.medialinword);

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
                                    className={`symbolSingle__symbol lang__${langClass} lang__${langClass}--${selectedFont} lang__${langClass}--${selectedForm} lang__${langClass}--${formgroup}`}
                                >
                                    <span>&zwj;&zwj;</span>
                                    {symbol.alphabet}
                                    <span>&zwj;&zwj;</span>
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
                            <div className={`symbolSingle__tooltipWrp`}>
                                {forms.map((form, i) => (
                                    <div
                                        key={i}
                                        className="symbolMorph__wrapper"
                                    >
                                        <h2 className="symbolMorph__morphType">
                                            {form}
                                        </h2>
                                        <h2
                                            className={`symbolMorph__morphedForm lang__${langClass}--${selectedFont} lang__${langClass}--${form}`}
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

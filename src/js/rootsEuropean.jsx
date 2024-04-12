import { Route, Link } from 'wouter';
import { useState, useContext } from 'react';
import { SelectFont } from './component';

export default function RootsEuropean() {
    const [selectedFont, setSelectedFont] = useState('serif');
    // const [selectedForm, setSelectedForm] = useState('alone');
    const handleFontChange = (selectedValue) => {
        setSelectedFont(selectedValue);
    };

    return (
        <Route path="/roots">
            <div className="sideBar">
                <h2 className="sideBar__meaning">hidden</h2>
                <div className="sideBar__selections">
                    <SelectFont onSelectFont={handleFontChange} />
                </div>
            </div>
            <div className="RootCard__wrapper">
                <div className="RootCard__card RootCard__card--latin">
                    <p
                        className={`RootCard__main RootCard__main--${selectedFont}`}
                    >
                        crypto
                    </p>
                    <p className="RootCard__example">
                        <em>crypto</em>graphy
                    </p>
                    <p className="RootCard__example">
                        <em>cripto</em>grafia
                    </p>
                </div>
                <div className="RootCard__card RootCard__card--cyrillic">
                    <p
                        className={`RootCard__main RootCard__main--${selectedFont}`}
                    >
                        крипто
                    </p>
                    <p className="RootCard__example">
                        <em>крипто</em>графия
                    </p>
                    <p className="RootCard__example">
                        <em>крипто</em>графија
                    </p>
                </div>
                <div className="RootCard__card RootCard__card--greek">
                    <p
                        className={`RootCard__main RootCard__main--${selectedFont}`}
                    >
                        κρυπτο
                    </p>
                    <p className="RootCard__example">
                        <em>κρυπτο</em>γράφηση
                    </p>
                </div>
            </div>
        </Route>
    );
}

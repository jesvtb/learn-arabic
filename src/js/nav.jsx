import { useEffect, useState, useContext } from 'react';
import { Link } from 'wouter';
import { LangItemsContext } from './app';

export function HomeNav() {
    const langItems = useContext(LangItemsContext);
    return (
        <div className="homeNav">
            {langItems?.map(
                ({ slug, localName, abbreviation, englishName }, i) => (
                    <Link
                        to={slug}
                        key={i}
                        className="homeNav__link"
                    >
                        <p
                            className={`homeNav__localName homeNav__localName--${abbreviation}`}
                        >
                            {localName}
                        </p>
                        <p className="homeNav__englishName">{englishName}</p>
                    </Link>
                )
            )}
        </div>
    );
}

export function ToggleTheme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="themeToggle"
        >
            {theme === 'light' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 16 16"
                >
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                </svg>
            )}
        </button>
    );
}

export function ToggleNav() {
    const [isToggled, setIsToggled] = useState(false);
    const langItems = useContext(LangItemsContext);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleButtonClick = () => {
        setIsToggled(!isToggled);
    };

    return (
        <>
            <div
                onClick={handleToggle}
                className="navToggle"
            >
                <svg
                    className={`navToggle__icon ${
                        isToggled ? 'navToggle__icon--open' : ''
                    }`}
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                >
                    <path d="M 20,29 H 80" />
                    <path d="M 20,50 H 60" />
                    <path d="M 20,71 H 80" />
                </svg>
            </div>
            <nav
                className={`toggleNav ${isToggled ? 'toggleNav--open' : ''}`}
                style={{ display: isToggled ? '' : 'none' }}
            >
                <ToggleTheme />
                {langItems.map((item, i) => (
                    <Link
                        to={item.slug}
                        key={i}
                        onClick={handleButtonClick}
                        className="toggleNav__link"
                    >
                        {item.localName}
                    </Link>
                ))}
            </nav>
        </>
    );
}

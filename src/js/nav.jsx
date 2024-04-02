import { useEffect, useState, useContext } from 'react';
import { Route, Link } from 'wouter';
import { LangItemsContext } from './app';

export function Homepage() {
    const langItems = useContext(LangItemsContext);
    return (
        <Route path="/">
            <div className="Homepage">
                <h2 className="Homepage__tagLine">
                    <span>
                        A <strong>symbol</strong> is a window
                    </span>
                    <br />
                    <span>through which </span>
                    <br />
                    <span>
                        one
                        <strong> sees into the infinite</strong>.
                    </span>
                </h2>
                <hr className="Homepage__divider" />
                <div className="Homepage__linksWrapper">
                    {langItems?.map(
                        ({ slug, localName, acronym, englishName }, i) => (
                            <Link
                                to={slug}
                                key={i}
                                className="Homepage__link"
                            >
                                <p
                                    className={`Homepage__localName Homepage__localName--${acronym}`}
                                >
                                    {localName}
                                </p>
                                <p className="Homepage__englishName">
                                    {englishName}
                                </p>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </Route>
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
            <svg
                // xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                // xmlns:serif="http://www.serif.com/"
                viewBox="0 0 64 64"
                version="1.1"
                // xml:space="preserve"
                // style=""
                // x="0px"
                // y="0px"
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                className={
                    theme === 'light'
                        ? 'themeToggle__light'
                        : 'themeToggle__dark'
                }
            >
                <g transform="matrix(1.14833,0,0,1.14833,-4.86865,-4.6912)">
                    <path d="M32,16C40.831,16 48,23.169 48,32C48,40.831 40.831,48 32,48C23.169,48 16,40.831 16,32C16,23.169 23.169,16 32,16ZM22,36.5C21.296,36.5 20.674,36.039 20.47,35.365C20.167,34.296 20,33.167 20,32C20,25.377 25.377,20 32,20C32,20 32,20 32,20C32.704,20 33.326,20.461 33.53,21.135C33.833,22.204 34,23.333 34,24.5C34,31.123 28.623,36.5 22,36.5C22,36.5 22,36.5 22,36.5Z" />
                </g>
                <g transform="matrix(0.81199,0.81199,-0.81199,0.81199,31.956,-19.8498)">
                    <path d="M29.917,7.882L29.917,11.59C29.917,12.74 30.85,13.673 32,13.673C33.15,13.673 34.083,12.74 34.083,11.59L34.083,7.882C34.083,6.732 33.15,5.798 32,5.798C30.85,5.798 29.917,6.732 29.917,7.882Z" />
                </g>
                <g transform="matrix(0.81199,0.81199,-0.81199,0.81199,31.956,-19.8498)">
                    <path d="M29.917,52.497L29.917,55.965C29.917,57.115 30.85,58.048 32,58.048C33.15,58.048 34.083,57.115 34.083,55.965L34.083,52.497C34.083,51.347 33.15,50.414 32,50.414C30.85,50.414 29.917,51.347 29.917,52.497Z" />
                </g>
                <g transform="matrix(-0.81199,0.81199,-0.81199,-0.81199,83.9233,32.1175)">
                    <path d="M29.917,8.055L29.917,11.571C29.917,12.72 30.85,13.654 32,13.654C33.15,13.654 34.083,12.72 34.083,11.571L34.083,8.055C34.083,6.905 33.15,5.971 32,5.971C30.85,5.971 29.917,6.905 29.917,8.055Z" />
                </g>
                <g transform="matrix(-0.81199,0.81199,-0.81199,-0.81199,83.9233,32.1175)">
                    <path d="M29.917,52.551L29.917,56.118C29.917,57.268 30.85,58.202 32,58.202C33.15,58.202 34.083,57.268 34.083,56.118L34.083,52.551C34.083,51.401 33.15,50.468 32,50.468C30.85,50.468 29.917,51.401 29.917,52.551Z" />
                </g>
                <g transform="matrix(4.46215e-16,1.14833,-1.14833,4.46215e-16,68.6584,-4.64717)">
                    <path d="M29.917,7.882L29.917,11.59C29.917,12.74 30.85,13.673 32,13.673C33.15,13.673 34.083,12.74 34.083,11.59L34.083,7.882C34.083,6.732 33.15,5.798 32,5.798C30.85,5.798 29.917,6.732 29.917,7.882Z" />
                </g>
                <g transform="matrix(4.46215e-16,1.14833,-1.14833,4.46215e-16,68.6584,-4.64717)">
                    <path d="M29.917,52.497L29.917,55.965C29.917,57.115 30.85,58.048 32,58.048C33.15,58.048 34.083,57.115 34.083,55.965L34.083,52.497C34.083,51.347 33.15,50.414 32,50.414C30.85,50.414 29.917,51.347 29.917,52.497Z" />
                </g>
                <g transform="matrix(-1.14833,-1.72111e-15,1.72111e-15,-1.14833,68.6584,68.8458)">
                    <path d="M29.917,8.055L29.917,11.571C29.917,12.72 30.85,13.654 32,13.654C33.15,13.654 34.083,12.72 34.083,11.571L34.083,8.055C34.083,6.905 33.15,5.971 32,5.971C30.85,5.971 29.917,6.905 29.917,8.055Z" />
                </g>
                <g transform="matrix(-1.14833,-1.72111e-15,1.72111e-15,-1.14833,68.6584,68.8458)">
                    <path d="M29.917,52.551L29.917,56.118C29.917,57.268 30.85,58.202 32,58.202C33.15,58.202 34.083,57.268 34.083,56.118L34.083,52.551C34.083,51.401 33.15,50.468 32,50.468C30.85,50.468 29.917,51.401 29.917,52.551Z" />
                </g>
            </svg>
            {/* {theme === 'light' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // fill="white"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // width="25"
                    // height="25"
                    viewBox="0 0 16 16"
                >
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                </svg>
            )} */}
        </button>
    );
}

export function Credits() {
    return (
        <div className="Credits">
            <p className="Credits__key">design & development</p>
            <p className="Credits__value">jessica luo</p>
        </div>
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
                    <path d="M 20,30 H 80" />
                    <path d="M 40,50 H 80" />
                    <path d="M 20,70 H 80" />
                </svg>
            </div>
            <nav
                className={`toggleNav ${isToggled ? 'toggleNav--open' : ''}`}
                // style={{ display: isToggled ? '' : 'none' }}
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

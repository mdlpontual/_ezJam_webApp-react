import React, { useState, useEffect, useCallback } from "react";
import IMG from "../../../../assets/images/ImagesHUB";

function SearchContainer({ search, setSearch, activePage, goBack, goForward }) {
    
    const [latestSearch, setLatestSearch] = useState(search); // Store the latest input

    const disableEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    // Custom throttle function
    const throttle = (func, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = new Date().getTime();
            if (now - lastCall < delay) return;
            lastCall = now;
            return func(...args);
        };
    };

    // Throttled fetch function
    const throttledFetch = useCallback(
        throttle((query) => {
            setSearch(query); // Trigger the fetch here
        }, 500),
        [] // Only initialize the throttle once
    );

    // Effect to monitor the latest search and throttle the fetch
    useEffect(() => {
        throttledFetch(latestSearch);
    }, [latestSearch, throttledFetch]);

    const handleInputChange = (event) => {
        setLatestSearch(event.target.value); // Update the search value immediately
    };

    return (
        <>
            <div id="search-container" className="container-fluid d-flex flex-column">
                <div id="searchbar-row" className="row">
                    <div id="arrow-box-col" className="col-auto">
                        <div id="arrow-container" className="container">
                            <div id="arrow-row" className="row">
                                <a id="go-back" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center" onClick={goBack}>
                                    <img title="Go to Previous Page" id="back-white" src={IMG.gobackPNG} alt="go back button" width="22px"/>
                                    <img title="Go to Previous Page" id="back-green" src={IMG.gobackGreenPNG} alt="go back button" width="22px"/>
                                </a>
                                <a id="go-foward" type="button" className="col-auto d-flex flex-column justify-content-center align-items-center" onClick={goForward}>
                                    <img title="Go to Next Page" id="foward-white" src={IMG.gofowardPNG} alt="go foward button" width="22px"/>
                                    <img title="Go to Next Page" id="foward-green" src={IMG.gofowardGreenPNG} alt="go foward button" width="22px"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="searchbar-col" className="col d-flex flex-column justify-content-center align-items-center">
                        <form id="form-elem" method="POST" className="container-fluid d-flex flex-column justify-content-center align-items-center">
                            <div id="form-row" className="row justify-content-center align-items-center">
                                <div id="search-button" className="col-2 d-flex justify-content-center align-items-center">
                                    <img className="col" src={IMG.searchPNG} alt="search button" width="30px"/>
                                </div>
                                <input 
                                    id="input-elem" 
                                    type="search" 
                                    placeholder="Search the Spotify Library" 
                                    className="col" 
                                    value={latestSearch} 
                                    onChange={handleInputChange} 
                                    onKeyDown={disableEnter}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="results-row" className="row">
                    <div id="results-col" className="col d-flex">
                        {activePage}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchContainer;
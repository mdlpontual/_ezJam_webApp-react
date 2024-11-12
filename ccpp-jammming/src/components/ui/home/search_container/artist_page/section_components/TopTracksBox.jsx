import React, { useState, useEffect } from "react";
import IMG from "../../../../../../assets/images/ImagesHUB";
import TopTrack from "./unit_components/TopTrack";

function TopTracksBox({ fetchedArtistTopTracksArray, onPlayButton, playTrack, pauseTrack, userPlaylistsArr, accessToken}) {
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const [isShiftSelecting, setIsShiftSelecting] = useState(false);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const handleTrackClick = (uriTrack, index, event) => {
        const isCtrlOrCmdPressed = event.metaKey || event.ctrlKey;
        const isShiftPressed = event.shiftKey;

        setSelectedTracks((prevSelected) => {
            if (isShiftPressed && lastSelectedIndex !== null) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                const range = fetchedArtistTopTracksArray.slice(start, end + 1).map(track => track.trackUri);
                return Array.from(new Set([...prevSelected, ...range]));
            } else if (isCtrlOrCmdPressed) {
                return prevSelected.includes(uriTrack)
                    ? prevSelected.filter(track => track !== uriTrack)
                    : [...prevSelected, uriTrack];
            } else {
                setLastSelectedIndex(index);
                return prevSelected.includes(uriTrack) ? [] : [uriTrack];
            }
        });
        
    };

    const handleMouseDown = (event) => {
        if (event.shiftKey) setIsShiftSelecting(true);
    };

    const handleMouseUp = () => setIsShiftSelecting(false);


    const handleOutsideClick = (event) => {
        const container = document.getElementById("top-five-container");
        if (!container.contains(event.target)) setSelectedTracks([]);
    };
    
    const handleKeyDown = (event) => {
        if (event.key === "Escape") setSelectedTracks([]); // Clears all selected tracks
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div id="top-five-container" 
                className={`container-fluid d-flex flex-column ${isShiftSelecting ? 'no-text-select' : ''}`}  
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp}
            >
                <div id="top-five-row" className="row">
                    <div id="top-five-col" className="col">
                    <div id="popular-box-title" className="container-fluid d-flex justify-content-between align-items-center">
                        <h4>Popular:</h4>
                        <a id="white-logo" href="https://mangadex.org/chapter/43929ad2-7327-4336-b69f-3ed1cfd16c77/8" target="_blank" rel="noopener noreferrer">
                            <img src={IMG.spotifyLogoWhite} width="100px"/>
                        </a>
                        <a id="green-logo" href="https://mangadex.org/chapter/43929ad2-7327-4336-b69f-3ed1cfd16c77/8" target="_blank" rel="noopener noreferrer">
                            <img src={IMG.spotifyLogo} width="100px"/>
                        </a>
                    </div>
                        {fetchedArtistTopTracksArray.map((track, i) => (
                            <TopTrack 
                                topTrack={track} 
                                order={i} 
                                onPlayButton={onPlayButton} 
                                playTrack={playTrack}
                                pauseTrack={pauseTrack}
                                key={track.trackUri} 
                                fetchedArtistTopTracksArray={fetchedArtistTopTracksArray}
                                userPlaylistsArr={userPlaylistsArr}
                                accessToken={accessToken}
                                onTrackClick={(event) => handleTrackClick(track.trackUri, fetchedArtistTopTracksArray.indexOf(track), event)}
                                isSelected={selectedTracks.includes(track.trackUri)}
                                selectedTracks={selectedTracks}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopTracksBox;
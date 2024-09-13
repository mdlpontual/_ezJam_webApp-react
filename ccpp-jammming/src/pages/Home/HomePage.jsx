import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/ui/home/header/HomeHeader";
import UserPlaylists from "../../components/ui/home/playlists_container/user_playlists/UserPlaylists";
import SearchContainer from "../../components/ui/home/search_container/SearchContainer";
import TrackPlayer from "../../components/ui/home/track_player/TrackPlayer";
import OpenPlaylist from "../../components/ui/home/playlists_container/open_playlist/OpenPlaylist";
import useAdimPlaylistPage from "../../hooks/useAdimPlaylistPage";
import useAdimSearchPage from "../../hooks/useAdimSearchPage";
import useAuth from "../../hooks/useAuth";
import usePlayTrack from "../../hooks/usePlayTrack";
import usePlayerControls from "../../hooks/usePlayerControls";
import { useTrack } from "../../hooks/TrackContext"; 

function HomePage({ code }) {
    const [search, setSearch] = useState("");
    
    const { currentTrackUri, updateCurrentTrackUri } = useTrack(); 

    const { accessToken } = useAuth(code);
    const { uriTrack, uriQueue, updateUri } = usePlayTrack();
    const { isPaused, isActive, currentTrack, trackPosition, playTrack, pauseTrack, previousTrack, nextTrack, seekPosition, volumeControl } = usePlayerControls({uriTrack, uriQueue});
    const { activePage, goBack, goForward, handleArtistClick, handleAlbumClick } = useAdimSearchPage(search, updateUri, playTrack, pauseTrack, accessToken);

    const isPlaylistOpen = useAdimPlaylistPage();

    // Function to handle when a new track is played
    const handlePlayTrack = () => {
        updateCurrentTrackUri(currentTrack.uri); // Update the global currentTrackUri
    };

    useEffect(() => {
        if (accessToken) {
            window.spotifyAccessToken = accessToken;
        }
    }, [accessToken]);

    return (
        <>
            <div id="home-page-container" className="container-fluid d-flex flex-column">
                <header id="header-row" className="row">
                    <div id="header-col" className="col">
                        <HomeHeader/>
                    </div>
                </header>
                <main id="main-row" className="row flex-grow-1">
                    <div id="playlists-col" className="col">  
                        {isPlaylistOpen ? <OpenPlaylist /> : <UserPlaylists />}
                    </div>
                    <div id="search-col" className="col">
                        <SearchContainer search={search} setSearch={setSearch} activePage={activePage} goBack={goBack} goForward={goForward} />
                    </div>
                </main>
                <footer id="footer-row" className="row">
                    <div id="footer-col" className="col">
                        <TrackPlayer 
                            isPaused={isPaused}
                            isActive={isActive}
                            currentTrack={currentTrack}
                            trackPosition={trackPosition}
                            playTrack={playTrack}
                            pauseTrack={pauseTrack}
                            previousTrack={previousTrack}
                            nextTrack={nextTrack}
                            seekPosition={seekPosition}
                            volumeControl={volumeControl}
                            onPlayButton={updateUri}
                            onArtistClick={handleArtistClick}
                            onAlbumClick={handleAlbumClick}
                            onPlayTrack={handlePlayTrack}
                            currentTrackUri={currentTrackUri} // Now this comes from context
                            accessToken={accessToken}/>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default HomePage;
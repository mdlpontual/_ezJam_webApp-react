import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function AlbumResultItem({ artistContent, albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken }) {
    let albumCoverImg;
    if (albumContent.albumCover) {
        albumCoverImg = albumContent.albumCover;
    } else {
        albumCoverImg = IMG.placeHolders;
    }

    // Check if artistContent is available
    if (!artistContent || !artistContent.artistId) {
        return null; // Do not render if artistContent is missing or incomplete
    }
    
    return (
        <>
            <div id="albuns-inner-row" className="row">
                <div id="album-thumbnail" className="col-1 d-flex justify-content-center align-items-center">
                    <img title={albumContent.albumTitle} src={albumCoverImg} alt="album cover" height="75px"/>
                </div>
                <div id="album-title" className="col d-flex flex-column justify-content-center align-items-start">
                    <h5 title={albumContent.albumTitle} id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                        {albumContent.albumTitle}
                    </h5>
                    <p title={artistContent.artistName}>{albumContent.albumYear} - <a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, userPlaylistsArr, accessToken)}>
                            {albumContent.albumAuthor}
                        </a>
                    </p>
                </div>
            </div>  
        </>
    );
}

export default AlbumResultItem;
domain = document.domain;
if (domain.slice(0, 4) == "www.") {
    domain = domain.slice(4, domain.length);
}

if (domain == "8tracks.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("player_container").getElementsByClassName("title_artist")[0].getElementsByClassName("t")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("player_container").getElementsByClassName("title_artist")[0].getElementsByClassName("a")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        try {
            album = document.getElementById("player_container").getElementsByClassName("track_metadata")[0].getElementsByClassName("album")[0].getElementsByClassName("detail")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        try {
            artwork = document.getElementById("player_mix").getElementsByTagName("img")[0].src.slice(0, -9) + "200&h=200";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "listen.beatsmusic.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("track")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("artist")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementById("t-art").style.backgroundImage.slice(5,-7) + "medium";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "deezer.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("player-track-link")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("player-track-link")[1].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("player-cover")[0].getElementsByTagName("img")[0].src.slice(0, -11) + "200x200.jpg";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "di.fm") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("track-name")[0].childNodes[2].nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("track-name")[0].childNodes[1].firstChild.nodeValue.trim();
            artist = artist.slice(0, artist.length-2);
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("track-region")[0].getElementsByTagName("img")[0].src.slice(0, -5) + "150x150";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "play.google.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("currently-playing-title").firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("player-artist").firstChild.nodeValue;
        } catch (err) { artist = null; }
        try {
            album = document.getElementsByClassName("currently-playing-details")[0].getElementsByClassName("player-album")[0].firstChild.nodeValue;
        } catch (err) { album = null; }
        try {
            artwork = document.getElementById("playerSongInfo").getElementsByClassName("image-wrapper")[0].getElementsByTagName("img")[0].src.slice(0, -9) + "200-c-e100";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "grooveshark.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("now-playing-metadata").getElementsByClassName("song")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("now-playing-metadata").getElementsByClassName("artist")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        callback([song, artist, album, artwork]);
    }
} else if (domain == "retro.grooveshark.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("np-meta-container").getElementsByClassName("song")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("np-meta-container").getElementsByClassName("artist")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        callback([song, artist, album, artwork]);
    }
} else if (domain == "hypem.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("player-nowplaying").getElementsByTagName("a")[1].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("player-nowplaying").getElementsByTagName("a")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        callback([song, artist, album, artwork]);
    }
} else if (domain == "iheart.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("player-song")[0].firstChild.nodeValue;
            if (song.trim().length == 0 || song.slice(0,20) == "Thanks for listening") {
                song = songValue;
                artist = artistValue;
            } else {
                try {
                    artist = document.getElementsByClassName("player-artist")[0].firstChild.nodeValue;
                } catch (err) { artist = null; }
            }
        } catch (err) { song = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("player-art")[0].getElementsByTagName("img")[0].src.slice(0, -8) + "200%2C200)";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "twitch.moobot.tv") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        var button = document.getElementsByClassName("widget-songrequests")[0].getElementsByClassName("btn-info")[0];
        var alreadyOpen = button.children.length > 1;
        if (!alreadyOpen)
            button.click();
        try {
            var elements = document.getElementById("songrequests-widget-info").children;
            var el = elements[0];
            for (var i = 1; i < elements.length && el.nodeName != "P"; i++)
                el = elements[i];
            song = el.firstChild.nodeValue;
        } catch (err) { song = null; }
        if (!alreadyOpen && button.children.length > 1)
            button.click();
        song = parseTrack(song);
        artist = song[1];
        song = song[0];
        album = null; // TODO: get album
        artwork = null; // TODO: get artwork
        callback([song, artist, album, artwork]);
    }
} else if (domain == "nightbot.tv") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("currentTitle").firstChild.nodeValue;
        } catch (err) { song = null; }
        song = parseTrack(song);
        artist = song[1];
        song = song[0];
        album = null;
        artwork = null;
        callback([song, artist, album, artwork]);
    }
} else if (domain == "beta.nightbot.tv") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("current-track")[0].firstChild.firstChild.firstChild.nodeValue;
        } catch (err) { song = null; }
        song = parseTrack(song);
        artist = song[1];
        song = song[0];
        album = null;
        artwork = null;
        callback([song, artist, album, artwork]);
    }
} else if (domain == "pandora.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("Tuner__Audio__TrackDetail__title")[0].firstChild.firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("Tuner__Audio__TrackDetail__artist")[0].firstChild.firstChild.nodeValue;
        } catch (err) { artist = null; }
        try {
            artwork = document.getElementsByClassName("Tuner__Audio__TrackDetail__img")[0].getElementsByTagName("img")[0].src;
            artwork = artwork.replace("90W_90H", "500W_500H");
        } catch (err) { artwork = null; }
        album = null;
        callback([song, artist, album, artwork]);
    }
} else if (domain == "plug.dj") {
    // TODO: getting banned?
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("now-playing-media").getElementsByClassName("bar-value")[0].childNodes[1].nodeValue;
            song = song.slice(3, song.length);
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("now-playing-media").getElementsByClassName("author")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        artwork = null; // TODO: get artwork
        callback([song, artist, album, artwork]);
    }
} else if (domain == "rdio.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("track_metadata")[0].getElementsByClassName("song_title")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("track_metadata")[0].getElementsByClassName("artist_title")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("queue_art")[0].src;
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "songza.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("miniplayer-info-track-title")[0].firstChild.firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("miniplayer-info-artist-name")[0].firstChild.firstChild.nodeValue.slice(3);
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("miniplayer-album-art")[0].src.slice(0, -6) + "m.jpeg";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "open.spotify.com") {
    getInfo = function(callback) {
        var song, artist, album;
        try {
            song = document.getElementsByClassName("track-info__name")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
            if (song == " ") song = null;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("track-info__artists")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
            if (artist == " ") artist = null;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("now-playing__cover-art")[0].getElementsByClassName("cover-art-image")[0].style.backgroundImage.slice(5, -2);
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "play.spotify.com") {
    getInfo = function(callback) {
        var song, artist = [], album;
        try {
            song = document.getElementById("app-player").contentWindow.document.getElementById("track-name").childNodes[0].firstChild.nodeValue;
            if (song == " ") song = null;
        } catch (err) { song = null; }
        try {
            var artists = document.getElementById("app-player").contentWindow.document.getElementById("track-artist").getElementsByTagName("a");
            var i;
            for (i=0; i<artists.length; i++) {
                artist.push(artists[i].firstChild.nodeValue);
            }
            artist = artist.join(", ");
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementById("app-player").contentWindow.document.getElementsByClassName("sp-image-img")[0].style.backgroundImage.slice(5, -2);
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "player.spotify.com") {
    getInfo = function(callback) {
        var song, artist, album;
        try {
            song = document.getElementById("main").contentWindow.document.getElementById("miniplayer").getElementsByClassName("title")[0].textContent;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("main").contentWindow.document.getElementById("miniplayer").getElementsByClassName("artist")[0].textContent;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementById("main").contentWindow.document.getElementById("miniplayer").getElementsByTagName("figure")[0].style.backgroundImage.slice(5, -2);
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "soundcloud.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("playbackSoundBadge__title")[0].childNodes[2].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            var title = document.title;
            var by_index = title.indexOf(" by ");
            if (title.toLowerCase().indexOf("soundcloud") == -1 && by_index > -1) {
                artist = title.substring(by_index + 4);
            } else {
                artist = artistValue;
            }
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("playbackSoundBadge")[0].getElementsByClassName("sc-artwork")[0].getElementsByTagName("span")[0].style.backgroundImage.slice(5, -11) + "200x200.jpg";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "themusicninja.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("track_title").getElementsByClassName("title")[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementById("track_title").getElementsByClassName("artist")[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        artwork = null; // TODO: get artwork
        callback([song, artist, album, artwork]);
    }
}
// Removed support because the info is in another site and we have to get it with a sync request, not allowed in public add-ons
/*else if (domain == "theblast.fm") {
    getInfo = function(callback) {
        var source = httpGet("http://www.theblast.fm/nowplayingsinglelinetheblast.php");
        var song, artist, album, artwork;
        try {
            song = /Title: <a [^>]+>(.+?)<\/a>/.exec(source)[1];
        } catch (err) { song = null; }
        try {
            artist = /Artist: <strong><font color=".+?">(.+?)<\/font>/.exec(source)[1];
        } catch (err) { artist = null; }
        try {
            album = /Album: <a [^>]+>(.+?)<\/a>/.exec(source)[1];
        } catch (err) { album = null; }
        try {
            artwork = /<img.*? src="(.+?)"/.exec(source)[1];
            artwork = artwork.replace(/\/50\//, "/200/");
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
}*/
else if (domain == "listen.tidal.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("player__text")[0].children[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("player__text")[0].children[1].children[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("image--player")[0].firstChild.firstChild.src.slice(0, -9) + "320x320.jpg";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "tunein.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("tuner").getElementsByClassName("line1")[0].firstChild.nodeValue;
            if (song.slice(0,10) == "Loading..." || song.slice(0,10) == "Connecting" ||song.slice(0,4) == "Live") {
                song = songValue;
            }
            try {
                artist = document.getElementById("tuner").getElementsByClassName("line2")[0].firstChild.firstChild.nodeValue;
            } catch (err) { artist = artistValue; }
        } catch (err) {
            try {
                song = document.getElementById("tuner").getElementsByClassName("line1")[0].firstChild.firstChild.nodeValue;
                if (song.slice(0,10) == "Loading..." || song.slice(0,10) == "Connecting" ||song.slice(0,4) == "Live") {
                    song = songValue;
                }
                try {
                    artist = document.getElementById("tuner").getElementsByClassName("line2")[0].firstChild.firstChild.nodeValue;
                } catch (err) { artist = artistValue; }
            } catch (err) { song = songValue; }
        }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("artwork")[0].getElementsByTagName("img")[0].src;
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "vk.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork, info;
        try {
            info = document.getElementsByClassName("top_audio_player_title")[0].firstChild.nodeValue;
            if (info.indexOf(" – ") != -1) {
                info = info.split(" – ", 2);
                artist = info[0];
                song = info[1];
            } else {
                song = info;
                artist = null;
            }
        } catch (err) {
            song = null; artist = null;
        }
        album = null; // TODO: get album
        artwork = null; // TODO: get artwork
        callback([song, artist, album, artwork]);
    }
} else if (domain == "music.microsoft.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementsByClassName("playerNowPlayingMetadata")[1].getElementsByClassName("primaryMetadata")[0].children[0].firstChild.nodeValue;
        } catch (err) { song = null; }
        try {
            artist = document.getElementsByClassName("playerNowPlayingMetadata")[1].getElementsByClassName("secondaryMetadata")[0].children[0].firstChild.nodeValue;
        } catch (err) { artist = null; }
        album = null; // TODO: get album
        try {
            artwork = document.getElementsByClassName("playerNowPlayingImg")[1].getElementsByClassName("imgWrapper")[0].getElementsByClassName("img")[0].src.slice(0, -9) + "200&h=200";
        } catch (err) { artwork = null; }
        callback([song, artist, album, artwork]);
    }
} else if (domain == "youtube.com") {
    getInfo = function(callback) {
        var song, artist, album, artwork;
        try {
            song = document.getElementById("eow-title").firstChild.nodeValue;
        } catch (err) { song = null; }
        song = parseTrack(song);
        artist = song[1];
        song = song[0];
        album = null; // TODO: get album
        artwork = null; // TODO: get artwork
        callback([song, artist, album, artwork]);
    }
}

songValue = null;
artistValue = null;
albumValue = null;
artworkValue = "-1";

interval = self.options.preferences.interval;
interval = interval > 0 ? 1000*interval : 5000;
window.setInterval(function(){
    try {
        getInfo(function(songInfo) {
            var newSong = songInfo[0], newArtist = songInfo[1], newAlbum = songInfo[2], newArtwork = songInfo[3];
            if (newSong != songValue || newArtist != artistValue || newAlbum != albumValue) {
                songValue = newSong;
                artistValue = newArtist;
                albumValue = newAlbum;
                saveData();
            }
            if (newArtwork != artworkValue) {
                artworkValue = newArtwork;
                saveArtwork();
            }
        });
    } catch (err) {}
}, interval);

function saveData() {
    var songInfo = [songValue, artistValue, albumValue];
    self.port.emit("songUpdate", songInfo);
}

function saveArtwork() {
    self.port.emit("artworkUpdate", artworkValue);
}

self.port.on("alert", function(message) {
    window.alert(message);
});

function parseTrack(track) {
    if (self.options.preferences.parseTrack) {
        if (track.indexOf(" - ") != -1) {
            return track.split(" - ", 2).reverse();
        }
    }
    return [track, null];
}

// function httpGet(theUrl, callback) {
//  var xmlHttp = new XMLHttpRequest();
//  xmlHttp.onreadystatechange = function() {
//      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//          callback(xmlHttp.responseText);
//  };
//  xmlHttp.open("GET", theUrl, true); // false for synchronous request
//  xmlHttp.send(null);
// }
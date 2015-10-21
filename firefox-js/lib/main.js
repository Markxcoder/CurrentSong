const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

Cu.import("resource://gre/modules/Downloads.jsm");
Cu.import("resource://gre/modules/osfile.jsm");
Cu.import("resource://gre/modules/Task.jsm");

var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var preferences = require("sdk/simple-prefs").prefs;
var notifications = require("sdk/notifications");

var worker;


pageMod.PageMod({
    include: [
        "*.8tracks.com",
        "*.listen.beatsmusic.com",
        "*.deezer.com",
        "*.di.fm",
        /.*play\.google\.com\/music\/listen.*/,
        "*.grooveshark.com",
        "*.retro.grooveshark.com",
        "*.iheart.com",
        "https://www.nightbot.tv/autodj",
        "*.pandora.com",
        "*.plug.dj",
        "*.rdio.com",
        "*.songza.com",
        "*.play.spotify.com",
        "*.player.spotify.com",
        "*.soundcloud.com",
        "*.themusicninja.com",
        "*.listen.tidal.com",
        "*.tunein.com",
        "*.vk.com",
        "*.music.microsoft.com",
        "*.youtube.com"],
    contentScriptFile: self.data.url("script.js"),
    contentScriptWhen: "ready",
    contentScriptOptions: {
        preferences: preferences
    },
    onAttach: link
});

function link(w) {
    worker = w;
    worker.port.on("songUpdate", function(songInfo) {
        songInfo[0] = songInfo[0] != null ? songInfo[0].trim() : "";
        songInfo[1] = songInfo[1] != null ? songInfo[1].trim() : "";
        songInfo[2] = songInfo[2] != null ? songInfo[2].trim() : "";

        if (songInfo[0].length > 0 || songInfo[1].length > 0 ||songInfo[2].length > 0) {
            saveData(songInfo);

            if (preferences.notify) {
                notifySong(songInfo);
            }
        }
    });
    worker.port.on("artworkUpdate", function(artworkURL) {
        if (preferences.saveArtwork) {
            artworkURL = artworkURL != null ? artworkURL.trim() : "";
            saveArtWork(artworkURL);
        }
    });
}

function saveData(songInfo) {
    // stop if preferences.saveFolder is not set
    if (!preferences.saveFolder) {
        worker.port.emit("alert", "CurrentSong error: 'Folder' option is not set.\n\n" +
                                    "Go to the Add-ons Manager, find CurrentSong in the extensions list,\n" +
                                    "click the Preferences button and set the 'Folder' option.");
        return;
    }

    let textFile = OS.Path.join(preferences.saveFolder, "song.txt");
    let xmlFile  = OS.Path.join(preferences.saveFolder, "song.xml");

    let song   = songInfo[0];
    let artist = songInfo[1];
    let album  = songInfo[2];

    let text = preferences.infoFormat;
    if (song.length != 0 || artist.length != 0 || album.length != 0) {
        // text file
        text = text.replace("%song%", song);
        text = text.replace("%artist%", artist);
        text = text.replace("%album%", album);
        saveTextFile(textFile, text);

        // xml file
        text = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" +
            "<event>\n" +
                "    <song>" + formatForXML(song) + "</song>\n" +
                "    <artist>" + formatForXML(artist) + "</artist>\n" +
                "    <album>" + formatForXML(album) + "</album>\n" +
            "</event>\n";
        saveTextFile(xmlFile, text);

    }
}

function saveArtWork(url) {
    let artFile = OS.Path.join(preferences.saveFolder, "song.jpg");
    if (url.length == 0) {
        url = "http://pacohobi.com/currentsong/artworkw.jpg";
    }
    downloadFile(artFile, url);
}

function saveTextFile(fileName, text) {
    let encoder = new TextEncoder(preferences.encoding);
    let array = encoder.encode(text);
    let promise = OS.File.writeAtomic(fileName, array);
}

function downloadFile(fileName, url) {
    Task.spawn(function () {
        yield Downloads.fetch(url, fileName);
    }).then(null, Cu.reportError);
}

function notifySong(songInfo) {
    let song   = songInfo[0];
    let artist = songInfo[1];
    let album  = songInfo[2];

    let text = "";
    if (artist.length > 0) text += "by " + artist + "\n";
    if (album.length > 0) text += "in " + album;

    notifications.notify({
        title: song,
        text: text,
        iconURL: self.data.url("icon64.png")
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatForXML(text) {
    text = text.replace(/&/g, "&amp;")
    text = text.replace(/</g, "&lt;")
    text = text.replace(/>/g, "&gt;")
    return text
}
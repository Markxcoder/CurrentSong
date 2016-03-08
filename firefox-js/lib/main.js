var name = "extensions.jid1-tXcW0tgdE3YBSQ@jetpack.sdk.console.logLevel";
require("sdk/preferences/service").set(name, "info");


console.log("main.js - imports", 1);
const {Cu} = require("chrome");
console.log("main.js - imports", 2);
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

console.log("main.js - imports", 3);
Cu.import("resource://gre/modules/Downloads.jsm");
console.log("main.js - imports", 4);
Cu.import("resource://gre/modules/osfile.jsm");
console.log("main.js - imports", 5);
Cu.import("resource://gre/modules/Task.jsm");

console.log("main.js - imports", 6);
var pageMod = require("sdk/page-mod");
console.log("main.js - imports", 7);
var self = require("sdk/self");
console.log("main.js - imports", 8);
var preferences = require("sdk/simple-prefs").prefs;
console.log("main.js - imports", 9);
var notifications = require("sdk/notifications");
console.log("main.js - imports", "end");

var worker;

console.log("main.js - pageMod init", 1);
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
        "*.beta.nightbot.tv",
        "*.pandora.com",
        "*.plug.dj",
        "*.rdio.com",
        "*.songza.com",
        "*.play.spotify.com",
        "*.player.spotify.com",
        "*.soundcloud.com",
        "*.themusicninja.com",
        /.*www\.theblast\.fm\/streams\/.*/,
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
    attachTo: "top",
    onAttach: link
});
console.log("main.js - pageMod init", "end");

function link(w) {
    console.log("main.js - link", 1);
    worker = w;
    console.log("main.js - link", 2);
    worker.port.on("songUpdate", function(songInfo) {
        console.log("main.js - songUpdate", 1);
        songInfo[0] = songInfo[0] != null ? songInfo[0].trim() : "";
        console.log("main.js - songUpdate", 2);
        songInfo[1] = songInfo[1] != null ? songInfo[1].trim() : "";
        console.log("main.js - songUpdate", 3);
        songInfo[2] = songInfo[2] != null ? songInfo[2].trim() : "";
        console.log("main.js - songUpdate", 4);

        if (songInfo[0].length > 0 || songInfo[1].length > 0 ||songInfo[2].length > 0) {
            console.log("main.js - songUpdate", "4-1");
            saveData(songInfo);
            console.log("main.js - songUpdate", "4-2");

            if (preferences.notify) {
                console.log("main.js - songUpdate", "4-2-1");
                notifySong(songInfo);
                console.log("main.js - songUpdate", "4-2-end");
            }
            console.log("main.js - songUpdate", "4-end");
        }
        console.log("main.js - songUpdate", "end");
    });
    console.log("main.js - link", 3);
    worker.port.on("artworkUpdate", function(artworkURL) {
        console.log("main.js - artworkUpdate", 1);
        if (preferences.saveArtwork) {
            console.log("main.js - artworkUpdate", "1-1");
            artworkURL = artworkURL != null ? artworkURL.trim() : "";
            console.log("main.js - artworkUpdate", "1-2");
            saveArtWork(artworkURL);
            console.log("main.js - artworkUpdate", "1-end");
        }
        console.log("main.js - artworkUpdate", "end");
    });
    console.log("main.js - link", "end");
}

function saveData(songInfo) {
    console.log("main.js - saveData", "1");
    // stop if preferences.saveFolder is not set
    console.log("main.js - saveData", "2");
    if (!preferences.saveFolder) {
        console.log("main.js - saveData", "2-1");
        worker.port.emit("alert", "CurrentSong error: 'Folder' option is not set.\n\n" +
                                    "Go to the Add-ons Manager, find CurrentSong in the extensions list,\n" +
                                    "click the Preferences button and set the 'Folder' option.");
        console.log("main.js - saveData", "2-end");
        return;
    }
    console.log("main.js - saveData", "3");
    let textFile = OS.Path.join(preferences.saveFolder, "song.txt");
    console.log("main.js - saveData", "4");
    let xmlFile  = OS.Path.join(preferences.saveFolder, "song.xml");
    console.log("main.js - saveData", "5");

    let song   = songInfo[0];
    let artist = songInfo[1];
    let album  = songInfo[2];
    console.log("main.js - saveData", "6");
    let text = preferences.infoFormat;
    console.log("main.js - saveData", "7");
    if (song.length != 0 || artist.length != 0 || album.length != 0) {
        console.log("main.js - saveData", "7-1");
        // text file
        text = text.replace("%song%", song);
        console.log("main.js - saveData", "7-2");
        text = text.replace("%artist%", artist);
        console.log("main.js - saveData", "7-3");
        text = text.replace("%album%", album);
        console.log("main.js - saveData", "7-4");
        text = text.replace("%line%", "\n");
        console.log("main.js - saveData", "7-5");
        saveTextFile(textFile, text);
        console.log("main.js - saveData", "7-6");

        // xml file
        text = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n" +
            "<event>\n" +
                "    <song>" + formatForXML(song) + "</song>\n" +
                "    <artist>" + formatForXML(artist) + "</artist>\n" +
                "    <album>" + formatForXML(album) + "</album>\n" +
            "</event>\n";
        console.log("main.js - saveData", "7-7");
        saveTextFile(xmlFile, text);
        console.log("main.js - saveData", "7-end");
    }
    console.log("main.js - saveData", "end");
}

function saveArtWork(url) {
    console.log("main.js - saveArtwork", "1");
    if (!preferences.saveFolder) return;
    console.log("main.js - saveArtwork", "2");
    let artFile = OS.Path.join(preferences.saveFolder, "song.jpg");
    console.log("main.js - saveArtwork", "3");
    if (url.length == 0) {
        console.log("main.js - saveArtwork", "3-1");
        url = "http://pacohobi.com/currentsong/artworkw.jpg";
        console.log("main.js - saveArtwork", "3-end");
    }
    console.log("main.js - saveArtwork", "4");
    downloadFile(artFile, url);
    console.log("main.js - saveArtwork", "end");
}

function saveTextFile(fileName, text) {
    console.log("main.js - saveTextFile", "1");
    let encoder = new TextEncoder(preferences.encoding);
    console.log("main.js - saveTextFile", "2");
    let array = encoder.encode(text);
    console.log("main.js - saveTextFile", "3");
    let promise = OS.File.writeAtomic(fileName, array);
    console.log("main.js - saveTextFile", "end");
}

function downloadFile(fileName, url) {
    console.log("main.js - downloadFile", "1");
    Task.spawn(function () {
        yield Downloads.fetch(url, fileName);
    }).then(null, Cu.reportError);
    console.log("main.js - downloadFile", "end");
}

function notifySong(songInfo) {
    console.log("main.js - notifySong", "1");
    let song   = songInfo[0];
    console.log("main.js - notifySong", "2");
    let artist = songInfo[1];
    console.log("main.js - notifySong", "3");
    let album  = songInfo[2];
    console.log("main.js - notifySong", "4");

    let text = "";
    if (artist.length > 0) text += "by " + artist + "\n";
    console.log("main.js - notifySong", "5");
    if (album.length > 0) text += "in " + album;
    console.log("main.js - notifySong", "6");
    notifications.notify({
        title: song,
        text: text,
        iconURL: self.data.url("icon64.png")
    });
    console.log("main.js - notifySong", "end");
}

function endsWith(str, suffix) {
    console.log("main.js - endsWith");
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatForXML(text) {
    console.log("main.js - formatForXML", "1");
    text = text.replace(/&/g, "&amp;")
    console.log("main.js - formatForXML", "2");
    text = text.replace(/</g, "&lt;")
    console.log("main.js - formatForXML", "3");
    text = text.replace(/>/g, "&gt;")
    console.log("main.js - formatForXML", "end");
    return text
}
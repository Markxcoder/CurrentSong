![CurrentSong](https://raw.githubusercontent.com/PacoHobi/CurrentSong/master/img/header.png)

CurrentSong is a Firefox extension that writes the current playing song from popular music sites to a text file and a XML file. The text file can be used with [OBS](https://obsproject.com), [XSplit](https://www.xsplit.com) or similar software to display the song information in an overlay. The XML file can be used to add animations to your overlay.

CurrentSong is very lightweight and non-intrusive: once you install and configure it, you can leave it and forget it. CurrentSong will not add any icons or menus to your browser and it will start working automatically when you start Firefox and go to one of the supported websites.

CurrentSong works under Windows, Mac and Linux.

Supported sites
---------------
+ [8tracks.com](http://8tracks.com)
+ [listen.beatsmusic.com](http://listen.beatsmusic.com)
+ [deezer.com](http://www.deezer.com/)
+ [di.fm](http://www.di.fm)
+ [play.google.com](http://play.google.com/music)
+ [grooveshark.com](http://grooveshark.com)
+ [retro.grooveshark.com](http://retro.grooveshark.com)
+ [hypem.com](http://hypem.com)
+ [iheart.com](http://iheart.com)
+ [music.microsoft.com](https://music.microsoft.com)
+ [twitch.moobot.tv](https://twitch.moobot.tv)
+ [nightbot.tv](http://nightbot.tv/autodj)
+ [beta.nightbot.tv](https://beta.nightbot.tv/song_requests)
+ [pandora.com](http://pandora.com)
+ [plug.dj](https://plug.dj)
+ [rdio.com](http://rdio.com)
+ [songza.com](http://songza.com)
+ [play.spotify.com](http://play.spotify.com)
+ [player.spotify.com](http://player.spotify.com)
+ [soundcloud.com](http://soundcloud.com)
+ [themusicninja.com](http://themusicninja.com)
+ [listen.tidal.com](http://listen.tidal.com/)
+ [tunein.com](http://tunein.com)
+ [vk.com](http://vk.com)
+ [youtube.com](http://youtube.com)

CurrentSong is in its early stages, support for more music sites will be added. If you want support for a specific site, please [contact me](mailto:hey@pacohobi.com).

Installation
------------
1. Go to CurrentSong's [Mozilla add-ons page](https://addons.mozilla.org/firefox/addon/currentsong/).
2. Click on the green '_Add to Firefox_' button.
3. If you are running Firefox a dialog should appear asking you if you want to install, click on _Install_. If the dialog does not appear, follow this steps:
  1. Open Firefox and go to the Add-ons Manager (`Ctrl`+`Shift`+`A`).
  2. Click on the gear icon > Install Add-on From File...
  3. Brose to the Add-on file you downloaded in step 1 and click Open.
  4. Click Install Now.
4. **Important:** Set the folder where the song info will be saved ([configuration](#configuration)).

#### Development version
You can download the most up to date unpacked version (source code) clicking [here](https://github.com/PacoHobi/CurrentSong/archive/master.zip), you can also download the unpacked version of [previous releases](https://github.com/PacoHobi/CurrentSong/tags).

To be able to use the unpacked version you will need the [Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

Configuration
-------------
To open CurrentSong's configuration follow this steps:

1. Open Firefox and go to the Add-ons Manager (`Ctrl`+`Shift`+`A`).
2. Find CurrentSong in the extensions list and click the Preferences button.

The text and XML files will be saved in _Folder_ with names `song.txt` and `song.xml`, respectively.

Support/Contact
---------------
If you ...

- Run into any problems installing/configuring CurrentSong
- Encounter a bug where you think the extension isn't working correctly
- Have any suggestions or comments
- Or simply feel like saying hi

Feel free to [shoot me an email](mailto:hey@pacohobi.com) or post on the [issues section](https://github.com/PacoHobi/CurrentSong/issues).

License
-------
Released under the [MIT License](https://github.com/PacoHobi/CurrentSong/blob/master/LICENSE).

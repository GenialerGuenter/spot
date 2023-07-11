const playlistlist = document.getElementById('sidebar');
let songlist;
let searchBar;
const songlistGlobal = [];
const playlistlistGlobal = [];
let waitinglist = 0;
const wait = [];
const history = [];
let isPlaying = false;
let countdownconter = 10; //variable for the live playback
let pausedtime = 100;
let wasPaused = false;
let searchbarOn = true;
let songTitle = false;
let playlistSearch = -1;

content()
showPlaylists()
getAllSongs()


// Methode um zwischen verschiedenen Seiten zu wechseln

function pageSwitch(page, id) {
    songTitle = false
    if (page === -1) {
        content()
        home()
    } else if (page === 0) {
        newSong()
    } else if (page === 1) {
        content()
        playlist(id)
    }else if (page === 2){
        let sId = prompt("Song Id")
        deleteSongGlobal(sId)
    }
}
// Erstellt den Hauptcontent für Home und die Playlist
function content() {
    document.getElementById('contentId').innerHTML = '<i class="fa-solid fa-bars fa-2xl switch" onclick="toggleSidebar()"></i>' +
        '<div class="searchbar" id="searchbardiv">\n' +
        '<input type="text" id="searchbar" placeholder="search...">\n' +
        '</div>\n' +
        '<div class="songsinplaylist">\n' +
        '<table class="song-main-table" id="songListe">\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>Name</th>\n' +
        '<th>Künstler*in</th>\n' +
        '<th>Dauer</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody id="songtablebody">\n' +
        '</tbody>\n' +
        '</table>\n' +
        '</div>'
    songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
    searchBar = document.getElementById('searchbardiv');
    console.log(1)
}
// Ruft die Homeseite auf
function home() {
    console.log(4)
    showPlaylists()
    searchbarOn = true;
    playlistSearch = -1;
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search...">'
    songlist.className = "song-main-table"
    getAllSongs()
    if (document.width <= 540) {
        toggleSidebar()
    }

}
// Ruft das Formular zum Erstellen eines neuen Songs auf
function newSong() {
    searchbarOn = false
    songTitle = true
    document.getElementById('contentId').innerHTML = '<h1 id="songTitle">Neuer Song</h1>' +
        '<form action="" method="post" id="newSongForm" class="songForm">' +
        '<label for="title">Der Name des Songs:</label><br>' +
        '<input type="text" id="title" value="Neuer Song" onkeyup="refreshTitle()"><br>' +
        '<label for="artist">Der Name des Künstlers/der Künsterin:</label><br>' +
        '<input type="text" id="artist"><br>' +
        '<label for="length">Die Länge des Songs:</label><br>' +
        '<input type="time" step="1" id="length" value="00:00:00"><br><br>' +
        '<input type="button" onclick="createSong()" value="Submit">' +
        '</form>'
}
// Verändert die Seite zur Playlistanzeige und gibt die Songs in der Playlist aus
function playlist(id) {
    songlist.className = "song-playlist-table"
    console.log(id)
    let i = 0;
    searchbarOn = false;
    fetch(`http://localhost:8080/api/playlist`).then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            json.forEach(element => {
                if (element.id === id) {
                    document.getElementById("searchbardiv").className = "playlist"
                    searchBar.innerHTML = '<h1 id="playlistname">' + element.name +
                        '<button class="deletebutton playlist" onclick="playPlaylist(' + i + ')">' +
                        '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                        '</button><button class="deletebutton playlist" onclick="queuePlaylist(' + i + ')">' +
                        '<i class="fa-solid fa-arrows-turn-right fa-flip-vertical fa-2xl" style="color: #000000;"></i>' +
                        '</button></h1>' +
                        '<div>' +
                        '<button class="newSongs" onclick="newSongs(' + id + ')">' +
                        'Songs hinzufügen' +
                        '</button>'
                        '</div>'
                    songlist.innerHTML = ""
                    element.songs.forEach(song => {
                            const songHTML = '<tr><td>' + song.title + '</td><td>' + song.artist + '</td><td>' +
                                toMinSec(song.length) + '</td><td><button id="deletesongfromplaylist" onclick="deleteFromPlaylist(' + song.id + ', ' + element.id + ')" ><i class="fa-regular fa-trash-can"></i></button></td></tr>';
                            const newRow = songlist.insertRow(songlist.rows.length);
                            newRow.innerHTML = songHTML;
                        }
                    )
                }
                i++
            })

        }
    )
    // if (screen.width <= 540) {
    //     toggleSidebar()
    // }
}
// Verändert die Seite zu einer Art Homebildschirm, bei dem Lieder ausgewählt werden können
function newSongs(playlistId) {
    searchbarOn = true;
    playlistSearch = playlistId;
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search..."><button id="backtoplaylist" onclick="playlist('+playlistId+')"><i class="fas fa-level-down fa-rotate-90 fa-2xl"></i></button>'
    songlist.className = "song-main-table"
    getAllSongs()
    if (screen.width <= 540) {
        toggleSidebar()
    }
}


// Methoden der Warteschlange
function addToWait(songID) {
    // console.log(songID)
    wait[waitinglist] = songID
    waitinglist++
    actWaitList()
}
function actWaitList() {
    wasPaused = false;
    const dropup = document.getElementById("waitList")
    dropup.innerHTML = ""
    let i = 0
    if (wait.length === 0) {
        isPlaying = false;
        document.getElementById("actName").innerText = "-----"
        document.getElementById("actLength").innerText = "--"
        document.getElementById("actArtist").innerText = "---"
    }
    wait.forEach(element => {
        if (i === 0) {
            document.getElementById("actName").innerText = songlistGlobal[element].title.replace( "&lt;","<").replace( "&gt;",">");
            document.getElementById("actLength").innerText = toMinSec(songlistGlobal[element].length)
            document.getElementById("actArtist").innerText = songlistGlobal[element].artist.replace( "&lt;","<").replace( "&gt;",">");
        } else {
            console.log(wait.length)
            let waitHTML = '<th><button class="songBtn" onclick="moveToSong(' + i + ')"><div class="waitSong">\n' +
                '<table class="songTable"><tr><th>' + songlistGlobal[element].title + '</th>\n' +
                '<td rowspan="2">' + toMinSec(songlistGlobal[element].length) + '</td></tr>\n' +
                '<tr><th>' + songlistGlobal[element].artist + '</th>\</tr>\n' +
                '</table>\n' +
                '</div>\n' +
                '</button>\n' +
                '</th>\n' +
                '<td colspan="2">\n' +
                '</td>\n'
            if (wait.length >= 3) {
                if (i === 1) {
                    let from = i
                    let to = i + 1
                    waitHTML += '<td colspan="2">\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ',' + to + ')">' +
                        '<i class="fa-solid fa-arrow-down fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                } else if (i === wait.length - 1) {
                    let from = i
                    let to = i - 1
                    waitHTML += '<td colspan="2">\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ',' + to + ');">\n' +
                        '<i class="fa-solid fa-arrow-up fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                } else {
                    let from = i
                    let up = i - 1
                    let down = i + 1
                    waitHTML += '<td>\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ',' + down + ');">\n' +
                        '<i class="fa-solid fa-arrow-down fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n' + '<td>\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ', ' + up + ')">' +
                        '<i class="fa-solid fa-arrow-up fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                }
            }

            waitHTML += '<td>' +
                '<button class="deletebutton" onclick="deleteSong(' + i + ');">\n' +
                '<i class="fa-solid fa-xmark fa-2xl" style="color: #000000;"></i>\n' +
                '</button>\n' +
                '</td>'
            const newRow = dropup.insertRow(dropup.rows.length);
            newRow.innerHTML = waitHTML
        }
        i++
    })
}
function moveSong(from, to) {
    let temp = wait[from]
    wait[from] = wait[to]
    wait[to] = temp
    actWaitList()
}
function moveToSong(song) {
    const addhistory = wait.splice(0, song)
    addhistory.forEach(song => {
        history.push(song)
    })
    waitinglist = waitinglist - song
    actWaitList()
}
function deleteSong(song) {
    wait.splice(song, 1)
    waitinglist--
    actWaitList()
}
function nextSong() {
    if (wait.length >= 1) {
        history.push(wait.shift())
        waitinglist--
        actWaitList()
        countdownconter = songlistGlobal[wait[0]].length;
        playQueue()
    }
}
function previousSong() {
    if (history.length > 0) {
        wait.unshift(history.pop())
        actWaitList()
        countdownconter = songlistGlobal[wait[0]].length;
        playQueue()
    }
}
function playSong(song) {
    clearWait()
    addToWait(song)
    actWaitList()
    countdownconter=songlistGlobal[wait[0]].length;
    playQueue(false)
}
function clearWait() {
    history.push(wait[0])
    wait.splice(0, wait.length)
    waitinglist = 0
}
function playQueue(pause) {
    if (isPlaying && !pause) {
    } else if (isPlaying && pause) {
        isPlaying = false
        pausedtime = countdownconter;
        wasPaused = true;
    } else {
        isPlaying = true;
        if (wait.length >= 1) {
            var duration = songlistGlobal[wait[0]].length
            console.log('now playling: ' + songlistGlobal[wait[0]].title + ' - ' + songlistGlobal[wait[0]].artist)
            if (wasPaused) {
                countdownconter = pausedtime;
            } else {
                countdownconter = duration;
            }
            countDown()

            function countDown() {
                if (isPlaying && wait.length !== 0) {

                    if (!isNaN(countdownconter)) {                       //Checks if countdowncounter is a Number  if yes --> decrement and show time in Min/Sec
                        countdownconter--
                        document.getElementById("actLength").innerText = toMinSec(countdownconter)
                    } else {                                                                                    // if not --> show countdowntimer anyway because I want to be able to just change the countdown to whatever
                        document.getElementById("actLength").innerText = countdownconter
                    }
                    console.log(countdownconter)

                    if (countdownconter <= 0) {
                        decrementQueue()
                        return;
                    }
                    setTimeout(countDown, 1000)

                }
            }

            function decrementQueue() {
                history.push(wait.shift())
                waitinglist--
                if (wait.length !== 0) {
                    actWaitList()
                    isPlaying = false
                    wasPaused = false
                    playQueue()
                }
                actWaitList()
            }
        }
    }

}
function queuePlaylist(playlist) {
    showPlaylists()
    playlistlistGlobal[playlist].songs.forEach(song => {
        addToWait(getSongID(song))
    })
    actWaitList()
}
function playPlaylist(playlist) {
    showPlaylists()
    clearWait()
    playlistlistGlobal[playlist].songs.forEach(song => {
        addToWait(getSongID(song))
    })
    actWaitList()
    playQueue()
}


// Datenbankbearbeitende Methoden
function createSong() {
    let title = document.getElementById("title").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");         //das .replace ersetzt potentielle html elemente
    let artist = document.getElementById("artist").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");       //um zu vermeiden, dass der songersteller irgendwie die website verändert
    let lengthString = document.getElementById("length").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let length = parseTime(lengthString)
    fetch('http://localhost:8080/api/song', {
        method: "POST",
        body: JSON.stringify({
            title: title,
            artist: artist,
            length: length
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
    setTimeout(mini, 50)

    function mini() {
        pageSwitch(-1)
    }
}
function deleteSongGlobal(sId){
    if (confirm('Bist du dir sicher?')) {
        fetch('http://localhost:8080/api/song/' + sId + '/delete-song', {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
    }
}
function createPlaylist() {
    let newPlaylistName = prompt('Wie möchtest du deine Playlist benennen?').replace(/</g, "&lt;").replace(/>/g, "&gt;"); //.replace vermeidet HTML Elemente
    if (newPlaylistName.length <= 1400) {
        fetch('http://localhost:8080/api/playlist', {
            method: "POST",
            body: JSON.stringify({
                name: newPlaylistName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        setTimeout(showPlaylists, 60)
    } else {
        alert('too long :D')
    }

}
function addSongToPlaylist(songID, pId) {
    let song = songlistGlobal[songID];
    fetch('http://localhost:8080/api/playlist/' + pId + '/add-song', {
        method: "PUT",
        body: song.id,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}
function deletePlaylist(pId) {
    if (confirm('Bist du dir sicher?')) {
        fetch('http://localhost:8080/api/playlist/' + pId + '/delete-playlist', {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
    }
    setTimeout(reloadPlaylist, 100)

    function reloadPlaylist() {
        home()
    }
}
function deleteFromPlaylist(songId, pId) {

    fetch('http://localhost:8080/api/playlist/' + pId + '/delete-song', {
        method: "PUT",
        body: songId,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
    setTimeout(reloadPlaylist, 100)

    function reloadPlaylist() {
        playlist(pId)
    }
}


// Stilistische Methoden (Verändern das Aussehen auf der Seite
document.getElementById("myBtn").onclick = function () {
    showDropup()
};
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}
function getAllSongs() {
    fetch("http://localhost:8080/api/song").then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            songlist.innerHTML = ""
            let i = 0;
            json.forEach(element => {
                songlistGlobal[i] = element
                let songHTML;
                if (playlistSearch >= 0) {
                    songHTML = '<tr><td>' + element.title + '</td><td>' + element.artist + '</td><td>' +
                        toMinSec(element.length) + '</td><td>' +
                        '<button class="deletebutton" onclick="addSongToPlaylist(' + i + ', ' + playlistSearch
                        + ');">' +
                        '<i class="fa-solid fa-circle-plus fa-2xl" style="color: #000000;"></i>' +
                        '</button></td></tr>';

                } else {
                    songHTML = '<tr><td>' + element.title + '</td><td>' + element.artist + '</td><td>' +
                        toMinSec(element.length) + '</td><td>' +
                        '<button class="deletebutton" onclick="addToWait(' + i + ');">' +
                        '<i class="fa-solid fa-arrows-turn-right fa-flip-vertical fa-2xl" style="color: #000000;"></i>' +
                        '</button></td><td>' +
                        '<button class="deletebutton" onclick="playSong(' + i + ')">' +
                        '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                        '</button></td></tr>';
                }
                const newRow = songlist.insertRow(songlist.rows.length);
                newRow.innerHTML = songHTML;
                i++
            })
        }
    )
    console.log(3)
}
function showPlaylists() {
    let i = 0
    fetch("http://localhost:8080/api/playlist").then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            playlistlist.innerHTML = ""
            json.forEach(element => {
                playlistlistGlobal[i] = element
                const playlistHTML = '<button id="newplaylistbutton" onClick="pageSwitch(1, ' + element.id + ')">' +
                    '<table><tr><td>'
                    + element.name +
                    '</td><th>' +
                    '<button onclick="deletePlaylist(' + element.id + ')" class="deletebutton">' +
                    '<i class="fa-regular fa-trash-can" ></i>' +  //regular class --> fa-regular fa-trash-can
                    '</button>' +
                    '</th></tr></table>'
                '</button>';
                playlistlist.innerHTML += playlistHTML;
                i++
            })
        }
    )
    console.log(2)
}
function refreshTitle() {
    if (songTitle) {
        document.getElementById("songTitle").innerHTML = document.getElementById("title").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
if (document.getElementById('searchbar').value != null) {
    setInterval(searchBarSearch, 500)
}
function searchBarSearch() {
    if (searchbarOn) {
        let input, filter, table, tr, td, i;
        input = document.getElementById("searchbar");
        filter = input.value.toUpperCase();
        table = document.getElementById("songtablebody");
        tr = table.getElementsByTagName("tr");

        // Es soll eine Überprüfung aller Tabellenzeilen durchgeführt werden. Diejenigen, die nicht mit der Suchanfrage übereinstimmen, sollen ausgerottet werden!!
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "none";
            for (let j = 0; j < tr.length; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        break;
                    }
                }
            }
        }
    }
}
function toMinSec(time) {
    let h = Math.floor(time/3600)
    let min = Math.floor((time-(h * 3600))/ 60)
    let sec = time % 60
    if (sec < 10) {
        sec = '0' + sec
    }
    if(h>0){
        if (min<10){
            min= '0'+min
        }
        return h+ ':'+min + ':' + sec;
    }else{
        return min+':'+sec
    }

}
function toggleSidebar() {
    if (document.getElementById("sidebardiv").style.display === "none") {
        document.getElementById("sidebardiv").style.display = "block";
        document.getElementById('contentId').style.marginLeft = "20%"
    } else {
        document.getElementById("sidebardiv").style.display = "none";
        document.getElementById('contentId').style.marginLeft = "0"
    }
}


// Other
function getSongID(songC) {
    let ind = -1
    songlistGlobal.forEach(song => {
        if (song.title === songC.title && song.artist === songC.artist && song.length === songC.length) {
            ind = songlistGlobal.indexOf(song)
        }
    })
    if (ind >= 0) {
        return ind;
    }
    return -1;
}
function parseTime(time) {
    let sec = 0
    let which = 0
    for (let i = time.length-1; i >= 0; i--) {
        if (time.charAt(i) !== ':') {
            addToSec(which, time.charAt(i))
        }
    }
    console.log(sec)
    return sec

    function addToSec(what, num) {
        console.log("what " + what)
        console.log(num)
        if(num >0) {
            if (what === 0) {
                sec += parseInt(num)
                which++
            } else if (what % 2 === 0) {
                addToSec(what - 1, (num * 6))
            } else {
                addToSec(what - 1, num * 10)
            }
        }else{
            which++
        }
    }
}

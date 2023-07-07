const playlistlist = document.getElementById('sidebar');
const songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchbardiv');
const songlistGlobal = [];
const playlistlistGlobal = [];
let waitinglist = 0;
const wait = [];
const history = [];
let isPlaying = false;
let countdownconter; //variable for the live playback
let pausedtime = 100;
let wasPaused = false;

getAllSongs()
showPlaylists()

function createSong(title, artist, length) {
    fetch('http://localhost:8080/api/song', {
        method: "POST",
        body: JSON.stringify({
            id: 1,
            title: title,
            artist: artist,
            length: length
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

document.getElementById("myBtn").onclick = function () {
    showDropup()
};

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
            document.getElementById("actName").innerText = songlistGlobal[element].title
            document.getElementById("actLength").innerText = toMinSec(songlistGlobal[element].length)
            document.getElementById("actArtist").innerText = songlistGlobal[element].artist
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
    playQueue(false)
}

function clearWait() {
    history.push(wait[0])
    wait.splice(0, wait.length)
    waitinglist = 0
}

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
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
                const songHTML = '<tr><td>' + element.title + '</td><td>' + element.artist + '</td><td>' +
                    toMinSec(element.length) + '</td><td>' +
                    '<button class="deletebutton" onclick="addToWait(' + i + ');">' +
                    '<i class="fa-solid fa-arrows-turn-right fa-flip-vertical fa-2xl" style="color: #000000;"></i>' +
                    '</button></td><td>' +
                    '<button class="deletebutton" onclick="playSong(' + i + ')">' +
                    '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                    '</button></td></tr>';
                const newRow = songlist.insertRow(songlist.rows.length);
                newRow.innerHTML = songHTML;
                i++
            })
        }
    )
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
                const playlistHTML = '<button id="newplaylistbutton" onClick="playlist(' + element.id + ')">' + element.name + '</button>';
                playlistlist.innerHTML += playlistHTML;
                i++
            })
        }
    )
}

//Funktion um die Suchleiste suchen zu lassen
if (document.getElementById('searchbar').value != null) {
    setInterval(searchBarSearch, 500)
}

function searchBarSearch() {
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

function home() {
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search...">'
    songlist.className = "song-main-table"
    getAllSongs()
    if (screen.width <= 540){
        toggleSidebar()
    }
}


//Verändert die seite zur Playlistanzeige und gibt die songs in der Playlist aus
function playlist(id) {
    songlist.className = "song-playlist-table"
    let i = 0;
    fetch(`http://localhost:8080/api/playlist`).then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            json.forEach(element => {
                if (element.id === id) {
                    searchBar.innerHTML = '<h1 id="playlistname">' + element.name +
                        '<button class="deletebutton playlist" onclick="playPlaylist(' + i + ')">' +
                        '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                        '</button><button class="deletebutton playlist" onclick="queuePlaylist(' + i + ')">' +
                        '<i class="fa-solid fa-arrows-turn-right fa-flip-vertical fa-2xl" style="color: #000000;"></i>' +
                        '</button></h1>'
                    songlist.innerHTML = ""
                    element.songs.forEach(song => {
                            const songHTML = '<tr><td>' + song.title + '</td><td>' + song.artist + '</td><td>' +
                                toMinSec(song.length) + '</td></tr>';
                            const newRow = songlist.insertRow(songlist.rows.length);
                            newRow.innerHTML = songHTML;
                        }
                    )
                }
                i++
            })

        }
    )
    if (screen.width <= 540){
        toggleSidebar()
    }

}

function playQueue(pause) {
    if (isPlaying && !pause){
    } else if(isPlaying && pause) {
        isPlaying = false
        pausedtime = countdownconter;
        wasPaused = true;
    }else {
        isPlaying = true;
        if (wait.length >= 1) {
            var duration = songlistGlobal[wait[0]].length
            console.log('now playling: ' + songlistGlobal[wait[0]].title + ' - ' + songlistGlobal[wait[0]].artist)
            if (!wasPaused) {
                countdownconter = duration;
            } else {
                countdownconter = pausedtime;
            }
            countDown()

            function countDown() {
                if (isPlaying && wait.length !== 0) {
                    countdownconter--
                    console.log(countdownconter)
                    document.getElementById("actLength").innerText = toMinSec(countdownconter)

                    if (countdownconter <= 0 ) {
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

function playPlaylist(playlist) {
    clearWait()
    playlistlistGlobal[playlist].songs.forEach(song => {
        addToWait(getSongID(song))
    })
    actWaitList()
    playQueue()
}

function queuePlaylist(playlist){
    playlistlistGlobal[playlist].songs.forEach(song => {
        addToWait(getSongID(song))
    })
    actWaitList()
}

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

function toMinSec(time) {
    let min = Math.floor(time / 60)
    let sec = time % 60
    if (sec < 10) {
        sec = '0' + sec
    }
    return min + ':' + sec;
}

function createPlaylist() {
    fetch('http://localhost:8080/api/playlist', {
        method: "POST",
        body: JSON.stringify({
            name: "Neue Playlist"
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
    setTimeout(showPlaylists, 50)
}

function addSongToPlaylist(songID, playlistID) {
    let song = songlistGlobal[songID];
    let playlist = playlistlistGlobal[playlistID]
    let pId = playlist.id
    fetch('http://localhost:8080/api/playlist/' + pId + '/add-song', {
        method: "PUT",
        body: song.id,
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

// function openSidebar() {
//     document.getElementById("sidebardiv").style.display = "block";
//     document.getElementById('contentId').style.marginLeft= "20%"
// }
//
// function closeSidebar() {
//     document.getElementById("sidebardiv").style.display = "none";
//     document.getElementById('contentId').style.marginLeft= "0"
// }
function toggleSidebar(){
    if (document.getElementById("sidebardiv").style.display == "none"){
        document.getElementById("sidebardiv").style.display = "block";
        document.getElementById('contentId').style.marginLeft= "20%"
    }else {
        document.getElementById("sidebardiv").style.display = "none";
        document.getElementById('contentId').style.marginLeft= "0"
    }
}




function playlistScreen(){
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search...">'
    songlist.className = "song-main-table"
    getAllSongs()

}
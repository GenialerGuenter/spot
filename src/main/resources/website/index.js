const playlistlist = document.getElementById('sidebar');
const songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchbardiv');
const songlistGlobal = [];
const playlistlistGlobal = [];
let waitinglist = 0;
const wait = [];
const history = [];
var isPlaying = false;
var countdownconter; //variable for the live playback
var pausedtime =100;
var wasPaused = false;

getAllSongs()

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
    wasPaused=false;
    const dropup = document.getElementById("waitList")
    dropup.innerHTML = ""
    let i = 0
    if(wait.length === 0){
        isPlaying=false;
        document.getElementById("actName").innerText = "-----"
        document.getElementById("actLength").innerText = "--"
        document.getElementById("actArtist").innerText = "---"
    }
    wait.forEach(element => {
        if(i === 0){
            document.getElementById("actName").innerText = songlistGlobal[element].titel
            document.getElementById("actLength").innerText = toMinSec(songlistGlobal[element].length)
            document.getElementById("actArtist").innerText = songlistGlobal[element].artist
        }else{
            console.log(wait.length)
            let waitHTML = '<th><button class="songBtn" onclick="moveToSong('+ i +')"><div class="waitSong">\n' +
                '<table class="songTable"><tr><th>' + songlistGlobal[element].titel + '</th>\n' +
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
                    let to = i +1
                    waitHTML += '<td colspan="2">\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ','+ to +')">' +
                        '<i class="fa-solid fa-arrow-down fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                } else if (i === wait.length - 1) {
                    let from = i
                    let to = i - 1
                    waitHTML += '<td colspan="2">\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ','+ to +');">\n' +
                        '<i class="fa-solid fa-arrow-up fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                } else {
                    let from = i
                    let up = i - 1
                    let down = i + 1
                    waitHTML += '<td>\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ','+ down +');">\n' +
                        '<i class="fa-solid fa-arrow-down fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n' + '<td>\n' +
                        '<button class="deletebutton" onclick="moveSong(' + from + ', '+ up +')">' +
                        '<i class="fa-solid fa-arrow-up fa-2xl" style="color: #000000;"></i>\n' +
                        '</button>\n' +
                        '</td>\n'
                }
            }

            waitHTML += '<td>' +
                '<button class="deletebutton" onclick="deleteSong('+ i +');">\n' +
                '<i class="fa-solid fa-xmark fa-2xl" style="color: #000000;"></i>\n' +
                '</button>\n' +
                '</td>'
            const newRow = dropup.insertRow(dropup.rows.length);
            newRow.innerHTML = waitHTML
        }
        i++
    })
}

function moveSong(from, to){
    let temp = wait[from]
    wait[from] = wait[to]
    wait[to] = temp
    actWaitList()
}

function moveToSong(song){
    const addhistory = wait.splice(0, song)
    addhistory.forEach(song=>{
        history.push(song)
    })
    waitinglist = waitinglist - song
    actWaitList()
}

function deleteSong(song){
    wait.splice(song, 1)
    waitinglist--
    actWaitList()
}

function nextSong(){
    if(wait.length >= 1) {
        history.push(wait.shift())
        waitinglist--
        actWaitList()
    }
}

function previousSong(){
    if(history.length > 0) {
        wait.unshift(history.pop())
        actWaitList()
    }
}

function playSong(song){
    clearWait()
    addToWait(song)
    actWaitList()
    playQueue(false)
}

function clearWait(){
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
                const songHTML = '<tr><td>' + element.titel + '</td><td>' + element.artist + '</td><td>' +
                    toMinSec(element.length) + '</td><td>' +
                    '<button class="deletebutton" onclick="addToWait(' + i + ');">' +
                    '<i class="fa-solid fa-arrows-turn-right fa-flip-vertical fa-2xl" style="color: #000000;"></i>' +
                    '</button></td><td>' +
                    '<button class="deletebutton" onclick="playSong('+ i +')">' +
                    '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                    '</button></td></tr>';
                const newRow = songlist.insertRow(songlist.rows.length);
                newRow.innerHTML = songHTML;
                i++
            })
        }
    )
}


fetch("http://localhost:8080/api/playlist").then(
    o => {
        return o.json()
    }
).then(
    json => {
        json.forEach(element => {
            const playlistHTML = '<button id="newplaylistbutton" onClick="playlist(' + element.id + ')">' + element.name + '</button>';
            playlistlist.innerHTML += playlistHTML;
        })
    }
)


//Funktion um die Suchleiste suchen zu lassen
if(document.getElementById('searchbar').value != null){
    setInterval(searchBarSearch,500)
}

function searchBarSearch() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("songtablebody");
    tr = table.getElementsByTagName("tr");

    // Es soll eine Überprüfung aller Tabellenzeilen durchgeführt werden. Diejenigen, die nicht mit der Suchanfrage übereinstimmen, sollen ausgerottet werden!!
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
        for(let j=0; j<tr.length; j++){
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1)                               {
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
                playlistlistGlobal[i] = element
                if (element.id === id) {
                    searchBar.innerHTML = '<h1 id="playlistname">' + element.name +
                        '<button class="deletebutton" onclick="playPlaylist('+ i +')">' +
                        '<i class="fa-solid fa-play fa-2xl" style="color: #000000;"></i>' +
                        '</button></h1>'
                    songlist.innerHTML = ""
                    element.songs.forEach(song => {
                        const songHTML = '<tr><td>' + song.titel + '</td><td>' + song.artist + '</td><td>' +
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

}

function playQueue(pause){
    if(isPlaying && pause){
        isPlaying=false
        pausedtime = countdownconter;
        wasPaused = true;
    }
    else {
        isPlaying = true;
        if (wait.length >= 1){
            var duration = songlistGlobal[wait[0]].length
            console.log('now playling: '+songlistGlobal[wait[0]].titel)
            if(!wasPaused){
                countdownconter = duration;
            }
            else {
                countdownconter=pausedtime;
            }
            countDown()

            function countDown(){
                if(isPlaying && wait.length !== 0){
                    console.log(countdownconter)
                    document.getElementById("actLength").innerText = toMinSec(countdownconter)
                    countdownconter--
                    if (countdownconter <=0){
                        decrementQueue()
                        return;
                    }
                    setTimeout(countDown, 100)

                }
                else {
                    return;
                }

            }

            // setTimeout(decrementQueue,duration*1000)  //deletes the current song after songs duration
            function decrementQueue(){
                history.push(wait.shift())
                waitinglist--
                if (wait.length != 0){
                    actWaitList()
                    isPlaying=false
                    wasPaused=false
                    playQueue()
                }
                actWaitList()
            }
        }
    }

}

function playPlaylist(playlist){
    console.log(playlistlistGlobal[playlist].songs)
    clearWait()
    playlistlistGlobal[playlist].songs.forEach(song=>{
        console.log(song)
        addToWait(getSongID(song))
    })
    actWaitList()
    playQueue()
}

function getSongID(song){
    return songlistGlobal.findIndex(checkSongs)

    function checkSongs(song1){
        return song === song
    }
}

function toMinSec(time){
    let min = Math.floor(time/60)
    let sec = time%60
    if (sec < 10){
        sec = '0'+sec
    }
    return min + ':' + sec;
}

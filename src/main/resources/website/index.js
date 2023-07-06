const playlistlist = document.getElementById('sidebar');
const songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchbardiv');
const songlistGlobal = [];
const playlistlistGlobal = [];
let waitinglist = 0;
const wait = [];

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

function removeFromWait() {

}

function play() {

}

function actWaitList() {
    const dropup = document.getElementById("waitList")
    dropup.innerHTML = ""
    let i = 0
    if(wait.length === 0){
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
                '<button class="deletebutton" onclick="window.location.href=\'#\';">\n' +
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
    wait.splice(0, song)
    actWaitList()
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
            var playlistHTML = '<button id="newplaylistbutton" onClick="playlist(' + element.id + ')">' + element.name + '</button>'
            playlistlist.innerHTML += playlistHTML;
        })
    }
)


//Funktion um die Suchleiste suchen zu lassen
if(document.getElementById('searchbar').value != null){
    setInterval(searchBarSearch,500)
}

function searchBarSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("songtablebody");
    tr = table.getElementsByTagName("tr");

    // Es soll eine Überprüfung aller Tabellenzeilen durchgeführt werden. Diejenigen, die nicht mit der Suchanfrage übereinstimmen, sollen ausgerottet werden!!
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
        for(var j=0; j<tr.length; j++){
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
    var i = 0
    fetch(`http://localhost:8080/api/playlist`).then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            json.forEach(element => {
                playlistlistGlobal[i] = element
                i++
                if (element.id === id) {
                    searchBar.innerHTML = '<h1 id="playlistname">' + element.name + '</h1><button onclick="playPlaylist()">cock</button>'
                    songlist.innerHTML = ""
                    element.songs.forEach(song => {
                            var songHTML = '<tr><td>' + song.titel + '</td><td>' + song.artist + '</td><td>' + toMinSec(song.length) + '</td></tr>'
                            var newRow = songlist.insertRow(songlist.rows.length)
                            newRow.innerHTML = songHTML;
                        }
                    )
                }
            })

        }
    )

}

function playQueue(){
    if (wait.length >= 1){
        var duration = songlistGlobal[wait[0]].length
        console.log(songlistGlobal[wait[0]])
        setTimeout(decrementQueue,duration*1000)
        function decrementQueue(){
            wait.shift()
            waitinglist--
            console.log(wait)
            if (wait != []){
                actWaitList()
                playQueue()
            }
            actWaitList()
        }
    }

}

function playPlaylist(){
    addToWait(0)
    addToWait(1)
    playQueue()
}
function toMinSec(time){
    let min = Math.floor(time/60)
    let sec = time%60
    if (sec < 10){
        sec = sec +'0'
    }
    var timeInMinSec = min+':'+sec
    return timeInMinSec
}

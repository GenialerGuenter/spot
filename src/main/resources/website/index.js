
var playlistlist = document.getElementById('sidebar')
var songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
var searchBar = document.getElementById('searchbardiv');
const songlistGlobal = [];
const playlistlistGlobal = [];
var waitinglist = 0;
const wait = [];

getAllSongs()

document.getElementById("myBtn").onclick = function () {
    showDropup()
};

function addToWait(song){
    wait[waitinglist] = song
    waitinglist++
}

function removeFromWait(){

}

function play(){

}

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}

function getAllSongs(){
    fetch("http://localhost:8080/api/song").then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            songlist.innerHTML = ""
            var i = 0
            json.forEach(element => {
                songlistGlobal[i] = element
                i++
                var songHTML = '<tr><td>'+ element.titel+'</td><td>'+element.artist+'</td><td>'+element.length+'</td></tr>'
                var newRow = songlist.insertRow(songlist.rows.length)
                newRow.innerHTML = songHTML;
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
            var playlistHTML = '<button id="newplaylistbutton" onClick="playlist('+ element.id +')">'+ element.name +'</button>'
            playlistlist.innerHTML += playlistHTML;
        })
    }
)


//Funktion um die Suchleiste suchen zu lassen
function searchBarSearch(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("songtablebody");
    tr = table.getElementsByTagName("tr");

    // Es soll eine Überprüfung aller Tabellenzeilen durchgeführt werden. Diejenigen, die nicht mit der Suchanfrage übereinstimmen, sollen ausgerottet werden!!
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function home(){
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search...">'
    songlist.className = "song-main-table"
    getAllSongs()
}



 //Verändert die seite zur Playlistanzeige und gibt die songs in der Playlist aus
function playlist(id){


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
                if(element.id === id){
                    searchBar.innerHTML = '<h1 id="playlistname">'+element.name+'</h1>'
                    songlist.innerHTML = ""
                    element.songs.forEach( song => {
                        var songHTML = '<tr><td>'+ song.titel+'</td><td>'+song.artist+'</td><td>'+song.length+'</td></tr>'
                        var newRow = songlist.insertRow(songlist.rows.length)
                        newRow.innerHTML = songHTML;
                        }
                    )
                }
            })

        }
    )

}

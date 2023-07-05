document.getElementById("myBtn").onclick = function () {
    showDropup()
};

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}

var songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];
var searchBar = document.getElementById('searchbardiv');

fetch("http://localhost:8080/api/song").then(
    o => {
        return o.json()
    }
).then(
    json => {
        json.forEach(element => {
            var matchHTML = '<tr><td>'+ element.titel+'</td><td>'+element.artist+'</td><td>'+element.length+'</td></tr>'
            var newRow = songlist.insertRow(songlist.rows.length)
            newRow.innerHTML = matchHTML;
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

function home(id){
    console.log('home')
    searchBar.innerHTML = '<input type="text" id="searchbar" placeholder="search...">'
    songlist.className = "song-main-table"
}



 //Verändert die seite zur Playlistanzeige und gibt die songs in der Playlist aus
function playlist(id){
    console.log('playlist'+ searchBar);

    searchBar.innerHTML = '<h1 id="playlistname">Playlistname</h1>'

    songlist.className = "song-playlist-table"

    fetch(`http://localhost:8080/api/song/playlist${id}`).then(
        o => {
            return o.json()
        }
    ).then(
        json => {
            json.forEach(element => {
                var matchHTML = '<tr><td>'+ element.titel+'</td><td>'+element.artist+'</td><td>'+element.length+'</td></tr>'
                var newRow = songlist.insertRow(songlist.rows.length)
                newRow.innerHTML = matchHTML;
            })

        }
    )

}
document.getElementById("myBtn").onclick = function () {
    showDropup()
};

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}

var songlist = document.getElementById('songListe').getElementsByTagName('tbody')[0];

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
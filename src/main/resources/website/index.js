document.getElementById("myBtn").onclick = function () {
    showDropup()
};

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}

fetch("http://localhost:8080/api/song").then(
    o => {
        //console.log(o.json())
        return o.json()
    }
).then(
    json => {
        json.forEach(element => {
            console.log(element)
            document.getElementById("songListe")
                .getElementsByTagName("tbody")
                .innerHTML = "<td>" + element.titel + "</td>" +
                "<td>" + element.artist + "</td>" + "<td>" + element.length + "</td>"
        })
    }
)
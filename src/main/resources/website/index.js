



document.getElementById("myBtn").onclick = function() {showDropup()};

/* showDropUp toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function showDropup() {
    document.getElementById("myDropup").classList.toggle("show");
}
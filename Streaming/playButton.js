window.onload = () => {
    var audio;

    document.getElementById("knappen").onclick = function () {
        audio = new Audio("http://localhost:2000");
        audio.play();
    }
}
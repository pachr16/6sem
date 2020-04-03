window.onload = () => {
    var audio;
    var socket = io('http://localhost:2000');

    document.getElementById("knappen").onclick = function () {
        fetch("http://localhost:2000/test");
    }
}
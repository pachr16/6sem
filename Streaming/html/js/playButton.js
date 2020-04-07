window.onload = () => {
    var audio;
    //var socket = io('http://localhost:2000');

    document.getElementById("knappen").onclick = async function () {
        const test = miscStartStream('beyonce');
        test.play;
    }
}
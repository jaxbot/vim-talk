var currentSlide = 1;

var socket = io.connect("http://localhost:9999/");

function nextSlide() {
        if (currentSlide < 1)
                currentSlide = 1;

        document.getElementById("slide").innerHTML = document.querySelectorAll(".slide")[currentSlide].innerHTML;

        location.hash = "#" + currentSlide;

        var termContainer = document.querySelector("#slide .terminal-container");
        if (termContainer) {
                console.log("found term");
                socket.emit("newvim", { file: termContainer.getAttribute("data-file") });
                var term = new Terminal({
                        cols: 90,
                        rows: 30,
                        useStyle: true,
                        screenKeys: true,
                        cursorBlink: false
                });
                term.on('data', function(data) {
                        socket.emit('data', data);
                });
                term.open(termContainer);
                socket.on('data', function(data) {
                        term.write(data);
                });
                socket.on('disconnect', function() {
                        term.destroy();
                });
        }
}

var rows = [
        { "keys": "QWERTYUIOP[]\\", top: 110, left: 105, spacing: 63 },
        { "keys": "ASDFGHJKL;'", top: 173, left: 122, spacing: 63 },
        { "keys": "ZXCVBNM,./", top: 236, left: 153, spacing: 63 },
        { "keys": [188, 190, 191], top: 236, left: 153 + 63 * 7, spacing: 63 },
        { "keys": [17], top: 300, left: 75, spacing: 63 },
        { "keys": "`1234567890-=", top: 50, left: 12, spacing: 63 },
];

window.onload = nextSlide;
window.addEventListener("keyup", function(event) {
        if (event.keyCode == 37 || event.keyCode == 38) {
                currentSlide--;
                nextSlide();
        } else if (event.keyCode == 39 || event.keyCode == 40) {
                currentSlide++;
                nextSlide();
        }
        console.log(event.keyCode);
        console.log(String.fromCharCode(event.keyCode));
        var row;
        var index;
        for (var i = 0; i < rows.length; i++) {
                index = rows[i].keys.indexOf("" + String.fromCharCode(event.keyCode));
                if (index == -1) {
                        index = rows[i].keys.indexOf(event.keyCode);
                }
                console.log(event.keyCode + " " + index);
                if (index != -1) {
                        row = rows[i];
                        break;
                }
        }
        var hi = document.getElementById("highlight");
        hi.style.top = row.top + "px";
        hi.style.left = row.left + (row.spacing * index) + "px";
});

if (location.hash) {
        currentSlide = ~~location.hash.substring(1);
}


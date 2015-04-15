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
                        cols: 80,
                        rows: 24,
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
});

if (location.hash) {
        currentSlide = ~~location.hash.substring(1);
}


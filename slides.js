var currentSlide = 1;

function nextSlide() {
        if (currentSlide < 1)
                currentSlide = 1;
        document.getElementById("slide").innerHTML = document.getElementById("slide" + currentSlide).innerHTML;
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


let NUM;

let winPrim = document.querySelector(".primary");
let winSec = document.querySelector(".secondary");











let buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.classList.toggle("pressed");
    });
    button.addEventListener("mouseup", () => {
        button.classList.toggle("pressed");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("pressed");
    });
})
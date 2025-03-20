const winPrimary = document.querySelector(".primary");
const winSecondary = document.querySelector(".secondary");

const numberBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const negBtn = document.querySelector('[data-neg');
const pointBtn = document.querySelector('[data-point]');
const equalBtn = document.querySelector('[data-equal]');

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("mousedown", () => button.classList.toggle("pressed"));
    button.addEventListener("mouseup", () => button.classList.toggle("pressed"));
    button.addEventListener("mouseleave", () => button.classList.remove("pressed"));
})

numberBtns.forEach(button => button.addEventListener("click", () => appendNum(button.textContent)));
operatorBtns.forEach(button => button.addEventListener("click", () => setOperator(button.textContent)));

clearBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteNum);
negBtn.addEventListener("click", negative);
pointBtn.addEventListener("click", addPoint);
equalBtn.addEventListener("click", evaluate);

let firstOp = null; //operand
let secondOp = null;
let currOperator = null;
let reset = false;

function appendNum(num) {
    if (winPrimary.textContent === "0" || reset)
        clear();
    winPrimary.textContent += num;
}

function setOperator(op) {
    if (currOperator !== null) evaluate();
    if (reset)
        return;
    firstOp = winPrimary.textContent;
    currOperator = op;
    winSecondary.textContent = firstOp + currOperator;
    reset = true;
}

function clear() {
    winPrimary.textContent = "";
    reset = false;
}

function clearAll() {
    winPrimary.textContent = "0";
    winSecondary.textContent = "History";
    reset = false;
    firstOp = null;
    secondOp = null;
    currOperator = null;
}

function deleteNum() {
    let num = winPrimary.textContent;
    num = num.toString().slice(0, -1);
    winPrimary.textContent = num;
}

function negative() {
    let num = winPrimary.textContent;
    if (!num.includes('-')) {
        num = '-' + num;
        winPrimary.textContent = num;
    }
}

function addPoint() {
    if (reset) clear();
    if (winPrimary.textContent === "")
        winPrimary.textContent = "0";
    let num = winPrimary.textContent;
    if (!num.includes('.'))
        winPrimary.textContent += '.';
}

function round(value) {
    return Math.round(value * 1000) / 1000;
}

function evaluate() {
    if (currOperator === null || reset) return;
    if (currOperator === "/" && winPrimary.textContent === "0") {
        winPrimary.innerHTML = `<span style="font-size: 50px;">🖕</span>`;
        reset = true;
        return;
    } 
    secondOp = winPrimary.textContent;
    let value = round(operate(currOperator, firstOp, secondOp));
    winSecondary.textContent = firstOp + currOperator + secondOp + '=';
    winPrimary.textContent = value;
    currOperator = null;
}

function operate(operator, first, second) {
    first = Number(first);
    second = Number(second);

    switch (operator) {
        case '+':
            return (first + second);
        case '-':
            return (first - second);
        case 'x':
            return (first * second);
        case '/':
            return (first / second);
        case '%':
            return (first % second);
        default:
            break;
    }
}

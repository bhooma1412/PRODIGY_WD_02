let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval = 0;
let running = false;
let savedTime = 0;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = "Pause";
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        savedTime = difference;
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = "";
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours > 9 ? hours : "0" + hours) + ":"
        + (minutes > 9 ? minutes : "0" + minutes) + ":"
        + (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    lapCounter++;
    let lapTime = display.innerHTML;
    let lapElement = document.createElement("tr");
    lapElement.innerHTML = `<td>Lap ${lapCounter}</td><td>${lapTime}</td>`;
    laps.appendChild(lapElement);
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

// let tenMinData = [];
// let fifteenMinData = [];
// let twentyMinData = [];
// let thirtyMinData = [];
// let customMindata = [];
// let timerDuration = 0;
let timeLeft = 0;
let timeLeftSeconds = 0;
// let elapsedTime = 0;
// let currentTime = 0;
let timerForm = document.querySelector('form');
let timerValue = document.querySelector("input[name='sprint-length']:checked");
let timerDisplay = document.querySelector('.timeDisplay');
// let timerSound = '';
let startNextMinTimer;
let startTimerBtn = document.querySelector('#startNow');
let startNextBtn =  document.querySelector('#startNext');
var timer;
// let timeNow;
function startTimer(seconds) {
  // debugger;
  let ms = seconds * 1000;
  let startTime = new Date().getTime();
  console.log(startTime);
  timer = setInterval(() => {
    timeLeft = Math.max(0, ms - (new Date().getTime()-startTime));
    updateDisplay();
    console.log(timeLeft);
    if(timeLeft === 0) {
      console.log('time is up');
      clearInterval(timer);
    }
    // timeLeft = timeLeft - 1;
    // updateDisplay();
    // currentTime = new Date().getTime();
    // elapsedTime = ;
  }, 1000);
}

function pauseTimer() {

}

function scheduleTimer() {

}

function startNextMin() {
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  console.log(seconds);
  startNextMinTimer = setInterval(() => {
    currentTime = new Date();
    seconds = currentTime.getSeconds();
    if(seconds === 0) {
        console.log('Starting timer!');
        clearInterval(startNextMinTimer);
        startTimer(timeLeftSeconds);
        
    }
  }, 1000);
}

function updateDisplay() {
  // debugger;
  // const msLeft = timeLeft;
  const secondsLeft = timeLeftSeconds;
  let displayResult = '';
  const seconds = secondsLeft % 60;
  const minutes = parseInt((secondsLeft/60) % 60);
  let hours = parseInt(secondsLeft/3600);
    //add zeros if less than ten
    function addLeadingZeros(time) {
      return time < 10 ? `0${time}` : time;
    }
  if(hours > 0) {
    displayResult += `${hours}:`;
  }
    displayResult += `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds)}`;
    timerDisplay.innerText = displayResult;
}

timerForm.addEventListener('change', function() {
  // update timer value when radio button is selected
  timerValue = document.querySelector("input[name='sprint-length']:checked");
  console.log(timerValue.value);
  //convert min to ms
  // debugger;
  timeLeftSeconds = timerValue.value * 60;
  updateDisplay();
});

startTimerBtn.addEventListener('click', function(e) {
  startTimer(timeLeftSeconds);
});
startNextBtn.addEventListener('click', startNextMin);
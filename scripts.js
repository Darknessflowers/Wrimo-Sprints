// let tenMinData = [];
// let fifteenMinData = [];
// let twentyMinData = [];
// let thirtyMinData = [];
// let customMindata = [];
let timeLeft = 0;
let timerForm = document.querySelector('form');
let timerValue = document.querySelector("input[name='sprint-length']:checked");
let timeLeftSeconds = timerValue.value * 60;
let timerDisplay = document.querySelector('.timeDisplay');
let startNextMinTimer;
let startTimerBtn = document.querySelector('#startNow');
let startNextBtn =  document.querySelector('#startNext');
var timer;
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
  }, 250);
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

// function updateDisplayBeforeStart() {
//   // debugger;
//   // const msLeft = timeLeft;
//   const secondsLeft = timeLeftSeconds;
//   let displayResult = '';
//   const seconds = secondsLeft % 60;
//   const minutes = parseInt((secondsLeft/60) % 60);
//   let hours = parseInt(secondsLeft/3600);
//     //add zeros if less than ten
//     function addLeadingZeros(time) {
//       return time < 10 ? `0${time}` : time;
//     }
//   if(hours > 0) {
//     displayResult += `${hours}:`;
//   }
//     displayResult += `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds)}`;
//     timerDisplay.innerText = displayResult;
// }

function updateDisplayBeforeStart() {
  switch(timerValue.value) {
    case '1':
      timerDisplay.innerText = "01:00";
    break;
    case '10':
      timerDisplay.innerText = "10:00";
    break;
    case '15':
      timerDisplay.innerText = "15:00";
    break;
    case '20':
      timerDisplay.innerText = "20:00";
    break;
    case '30':
      timerDisplay.innerText = "30:00";
    break;
    default:
      timerDisplay.innerText = "00:00";
    break;
  }
}

function updateDisplay() {
  let min = Math.floor(timeLeft/60000);
  let seconds = Math.floor(timeLeft/1000)%60;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  timerDisplay.innerHTML = min+":"+seconds;
}

updateDisplayBeforeStart();

timerForm.addEventListener('change', function() {
  // update timer value when radio button is selected
  timerValue = document.querySelector("input[name='sprint-length']:checked");
  console.log(timerValue.value);
  //convert min to seconds
  timeLeftSeconds = timerValue.value * 60;
  updateDisplayBeforeStart();
});

startTimerBtn.addEventListener('click', function() {
  startTimer(timeLeftSeconds);
});
startNextBtn.addEventListener('click', startNextMin);
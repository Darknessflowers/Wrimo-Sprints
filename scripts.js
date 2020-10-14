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
let pauseBtn =  document.querySelector('#pause');
let resetBtn =  document.querySelector('#reset');

let isTimerRunning = false;
var timer;
function startTimer(seconds) {
  // debugger;
  let ms = seconds * 1000;
  let startTime = new Date().getTime();
  console.log(startTime);
  isTimerRunning = true;
  startTimerBtn.innerText = 'Pause';
  timer = setInterval(() => {
    timeLeft = Math.max(0, ms - (new Date().getTime()-startTime));
    updateDisplay();
    console.log(timeLeft);
    if(timeLeft === 0) {
      console.log('time is up');
      clearInterval(timer);
      isTimerRunning = false;
    }
  }, 250);
}

function pauseTimer() {
if (isTimerRunning) {
  clearInterval(timer);
  startTimerBtn.innerText = 'Resume';
  isTimerRunning = false;
} else {
  console.log('Timer wasn\'t running');
}
}

function resumeTimer() {
  if (!isTimerRunning) {
    //startTimer takes seconds and timeLeft is ms so convert back to seconds
    //resume the timer
    startTimer(timeLeft/1000);
    startTimerBtn.innerText = 'Pause';
    isTimerRunning = true;
  }
  else {
    console.log('Console was running');
  }
}
function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  timeLeft = 0;
  startTimerBtn.innerText = 'Start';
  // updateDisplay();
  updateDisplayBeforeStart();
}

function scheduleTimer() {

}

function startNextMin() {
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  console.log(seconds);
  startNextBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
  startNextMinTimer = setInterval(() => {
    currentTime = new Date();
    seconds = currentTime.getSeconds();
    startNextBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
    if(seconds === 0) {
        console.log('Starting timer!');
        startNextBtn.innerText = `Write!`;
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
  if(isTimerRunning === false) {
    if(timeLeft === 0) {
    startTimer(timeLeftSeconds);
    }
    else {
      resumeTimer();
    }
  } else {
    pauseTimer();
  }
});
startNextBtn.addEventListener('click', startNextMin);
resetBtn.addEventListener('click', resetTimer);
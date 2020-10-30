let timeLeft = 0;
// let timerValue = document.querySelector("input[name='sprint-length']:checked");
let timerValue = document.querySelector('.timeWrap .selected').getAttribute('aria-time');
let timeSelected = document.querySelectorAll('.timeWrap button');
let timeLeftSeconds = timerValue * 60;
let timerDisplay = document.querySelector('.timeDisplay');
let startNextMinTimer;
let startTimerBtn = document.querySelector('#startNow');
let startNextBtn =  document.querySelector('#startNext');
let resetBtn =  document.querySelector('#reset');
let notificationImg = './favicon.png';
let notificationText = 'Time up!';
let isTimerRunning = false;
var timer;
let wordsModal = document.querySelector('#modal');
let ignoreModal = document.querySelector('.noWords');
let startTime = 0;
let modalForm = document.querySelector('#modal form');

var wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

auth.onAuthStateChanged(user => {
  debugger;
  if(user) {
  setupUi(user);
  }
  else {
    setupUi(user);
  }
});

function startTimer(seconds) {
  // debugger;
  let ms = seconds * 1000;
  startTime = new Date().getTime();
  console.log(startTime);
  isTimerRunning = true;
  startTimerBtn.innerText = 'Pause';
  timer = setInterval(() => {
    timeLeft = Math.max(0, ms - (new Date().getTime()-startTime));
    updateDisplay();
    // console.log(timeLeft);
    if(timeLeft === 0) {
      console.log('time is up');
      notificationText = 'Time up!';
      playNotification();
      startTimerBtn.innerText = 'Start';
      clearInterval(timer);
      isTimerRunning = false;
      auth.onAuthStateChanged(user => {
        if(user) {
        howManyWords();
        }
      });
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
  clearInterval(startNextMinTimer);
  startNextBtn.innerText = `Start next min`;
  clearInterval(timer);
  isTimerRunning = false;
  timeLeft = 0;
  startTimerBtn.innerText = 'Start';
  startNextBtn.style.display = 'block';

  // updateDisplay();
  updateDisplayBeforeStart();
}

function startNextMin() {
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  console.log(seconds);
  startNextBtn.style.display = 'none';
  startTimerBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
  startNextMinTimer = setInterval(() => {
    currentTime = new Date();
    seconds = currentTime.getSeconds();
    startTimerBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
    if(seconds === 0) {
        console.log('Starting timer!');
        notificationText = 'Start writing!';
        playNotification();
        // startNextBtn.innerText = `Write!`;
        clearInterval(startNextMinTimer);
        startTimer(timeLeftSeconds);
    }
  }, 1000);
}

function playNotification() {
  new Notification('Writing Sprints Timer', { body: notificationText, vibrate: [200, 100, 200], icon: notificationImg });
}

//saving data
async function sendToDb(e) {
  e.preventDefault();

  db.collection('sprints-data').add({
    sprLength: parseInt(timerValue),
    words: parseInt(modalForm.words.value),
    date: startTime
  });

  modalForm.words.value = '';
 
  await wait(1000);
  closeModal();
}
function howManyWords() {
  wordsModal.classList.add('open');
  ignoreModal.addEventListener('click', closeModal);
  modalForm.addEventListener('submit', sendToDb);
}

function closeModal() {
  wordsModal.classList.remove('open');
}

function updateDisplayBeforeStart() {
  switch(timerValue) {
    case '1':
      timerDisplay.innerText = "01:00";
    break;
    case '5':
      timerDisplay.innerText = "05:00";
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
  min = (min < 10 ? "0" : "") + min;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  timerDisplay.innerHTML = min+":"+seconds;
}



startTimerBtn.addEventListener('click', function() {
  if(isTimerRunning === false) {
    startNextBtn.style.display = 'none';
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

function handleTime(e) {
  // debugger;
  console.log(e.currentTarget.getAttribute('aria-time'));
  timeSelected.forEach(button => button.classList.remove('selected'));
  e.currentTarget.classList.add('selected');
  timerValue = document.querySelector('.timeWrap .selected').getAttribute('aria-time');
  timeLeftSeconds = timerValue * 60;
  // console.log(timeLeftSeconds);
  updateDisplayBeforeStart();
}


function init() {
  // document.querySelectorAll('[data-type]').forEach(draw);
  auth.onAuthStateChanged(user => {
    if(user) {
      setupUi(user);
    }
    else {
      setupUi(user);
    }
  });
  
  timeSelected.forEach(button => {
    button.addEventListener('click', handleTime);
  });
  updateDisplayBeforeStart();

  startNextBtn.addEventListener('click', startNextMin);
  resetBtn.addEventListener('click', resetTimer);
}

init(); 

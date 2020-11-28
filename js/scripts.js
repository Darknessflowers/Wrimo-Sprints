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
let finishedPomodoroSound = new Audio('./sounds/cat-meow.wav');
let customTimeBtn = document.querySelector('.customTime');
let scheduleTimeBtn = document.querySelector('#startSchedule');
let customFormContainer = document.querySelector('#customOuterWrap');
let scheduleFormContainer = document.querySelector('#scheduleOuterWrap');
let customForm = customFormContainer.querySelector('form');
let scheduleForm = scheduleFormContainer .querySelector('form');

async function showCustomForm() {
  if(customFormContainer.classList.contains('reveal')) {
    customFormContainer.classList.remove('reveal');
    window.removeEventListener('click', handleClickOutside);
  } else {
    customFormContainer.classList.add('reveal');
    await wait(250);
    window.addEventListener('click', handleClickOutside);
  }
}

async function showScheduleForm() {
  if(scheduleFormContainer.classList.contains('reveal')) {
    scheduleFormContainer.classList.remove('reveal');
    window.removeEventListener('click', handleClickOutsideSchedule);
  } else {
    scheduleFormContainer.classList.add('reveal');
    await wait(250);
    window.addEventListener('click', handleClickOutsideSchedule);
  }
}

function handleClickOutside(e) {
  let outside = e.target.closest('#customOuterWrap');
  if(outside === null) {
    customFormContainer.classList.remove('reveal');
    window.removeEventListener('click', handleClickOutside);
  }
}

function handleClickOutsideSchedule(e) {
  let outside = e.target.closest('#scheduleWrap');
  if(outside === null) {
    scheduleFormContainer.classList.remove('reveal');
    window.removeEventListener('click', handleClickOutsideSchedule);
  }
}

function handleCustomFormSubmit(e) {
  e.preventDefault();
  let customLength = parseInt(customForm.custom.value);
  timerValue = customLength;
  timeLeftSeconds = timerValue * 60;
  updateDisplayBefore(customLength);
  customFormContainer.classList.remove('reveal');
  window.removeEventListener('click', handleClickOutside);
}

function handleScheduleTimeSubmit(e) {
  e.preventDefault();
  let scheduleMin = parseInt(scheduleForm.schedule.value);
  startCustomMin(scheduleMin);
  scheduleFormContainer.classList.remove('reveal');
  window.removeEventListener('click', handleClickOutsideSchedule);
}

var wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

async function playMeow() {
  try {
    await finishedPomodoroSound.play();
  } catch(err) {
    console.log(err);
  }
}

//if user logs in or logs out change the display
auth.onAuthStateChanged(user => {
  if(user) {
  setupUi(user);
  }
  else {
    setupUi(user);
  }
});

function startTimer(seconds) {
  timeSelected.forEach(btn => {
      btn.disabled = true;
      btn.removeEventListener('click', handleTime);
  });
  let ms = seconds * 1000;
  startTime = new Date().getTime();
  isTimerRunning = true;
  startTimerBtn.innerText = 'Pause';
  timer = setInterval(() => {
    timeLeft = Math.max(0, ms - (new Date().getTime()-startTime));
    updateDisplay();
    if(timeLeft === 0) {
      notificationText = 'Time up!';
      playNotification();
      playMeow();
      timeSelected.forEach(btn => {
        btn.disabled = false;
        btn.addEventListener('click', handleTime);
      });
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
  timeSelected.forEach(btn => {
    btn.disabled = false;
    btn.addEventListener('click', handleTime);
  });
  startTimerBtn.innerText = 'Start';
  startNextBtn.style.display = 'block';
  scheduleTimeBtn.style.display = 'block';
  startTimerBtn.addEventListener('click', pauseOrResume);
  // updateDisplay();
  updateDisplayBefore(timerValue);
}
function startNextMin() {
  let startingTime = new Date();
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  let initialMin = startingTime.getMinutes();
  let nextMinute;
  let currentMin;
  if(initialMin === 59) {
    nextMinute = 0;
  } else {
    nextMinute = initialMin + 1;
  }
  startNextMinTimer = setInterval(() => {
    currentTime = new Date();
    currentMin = currentTime.getMinutes();
    seconds = currentTime.getSeconds();
    startTimerBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
    if(currentMin === nextMinute) {
        console.log('Starting timer!');
        notificationText = 'Start writing!';
        try {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('Not a desktop device. No notifications.')
          } else {
            playNotification();
            playMeow();
          }
        } catch(err) {
          console.log(err);
        }
        clearInterval(startNextMinTimer);
        startTimer(timeLeftSeconds);
        startTimerBtn.addEventListener('click', pauseOrResume);
    }
  }, 100);
  startNextBtn.style.display = 'none';
  scheduleTimeBtn.style.display = 'none';
  startTimerBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
  startTimerBtn.removeEventListener('click', pauseOrResume);
}


function startCustomMin(triggerMin) {
  let startingTime = new Date();
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  let initialMin = startingTime.getMinutes();
  let minToStart = triggerMin;
  let currentMin;
  let minDiff;
  let tempMin;
  let hasZeroPassed;
  startNextMinTimer = setInterval(() => {
    currentTime = new Date();
    currentMin = currentTime.getMinutes();
    seconds = currentTime.getSeconds();
    if(triggerMin === 0) {
      //if trigger min is 0 calc diff between 59 and number and add 1
      tempMin = 59 - currentMin;
      minDiff = tempMin + 1;
    } else if(triggerMin < initialMin) {
      //if it is :00 add to var
      if(currentMin === 0) {
        hasZeroPassed = 1;
      }
      //calc diff between current time and 00
      if(hasZeroPassed === 1) {
        //if after zero count minDiff normalls
        minDiff = (59 - currentMin) + 1;
      } else {
        //calc time until :00
        tempMin = (59 - currentMin) + 1;
        //calc diff between :00 and min, then add to tempMin
        minDiff = tempMin + triggerMin;
      }
    } else {
      minDiff = minToStart - currentMin;
    }
    if(minDiff > 1) {
      //show min
      startTimerBtn.innerText = `Starting timer in ${minDiff} min`;
    } else {
      //show seconds
      startTimerBtn.innerText = `Starting timer in ${60 - seconds} seconds`;
    }
    // console.log(seconds);
    if(currentMin === minToStart) {
        notificationText = 'Start writing!';
        try {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('Not a desktop device. No notifications.')
          } else {
            playNotification();
            playMeow();
          }
        } catch(err) {
          console.log(err);
        }
        // startNextBtn.innerText = `Write!`;
        clearInterval(startNextMinTimer);
        startTimer(timeLeftSeconds);
        startTimerBtn.addEventListener('click', pauseOrResume);
    }
  }, 250);
  startNextBtn.style.display = 'none';
  scheduleTimeBtn.style.display = 'none';
  // startTimerBtn.innerText = `Starting timer in ${minDiff} min`;
  startTimerBtn.removeEventListener('click', pauseOrResume);
}

function playNotification() {
  try {
    new Notification('Writing Sprints Timer', { body: notificationText, vibrate: [200, 100, 200], icon: notificationImg });
  } catch(err) {
    console.log(err);
  }
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

// function updateDisplayBeforeStart() {
//   switch(timerValue) {
//     case '1':
//       timerDisplay.innerText = "01:00";
//     break;
//     case '5':
//       timerDisplay.innerText = "05:00";
//     break;
//     case '10':
//       timerDisplay.innerText = "10:00";
//     break;
//     case '15':
//       timerDisplay.innerText = "15:00";
//     break;
//     case '20':
//       timerDisplay.innerText = "20:00";
//     break;
//     case '30':
//       timerDisplay.innerText = "30:00";
//     break;
//     default:
//       timerDisplay.innerText = "00:00";
//     break;
//   }
// }
function updateDisplayBefore(length) {
  let inputToMs = length * 60000;
  let min = Math.floor(inputToMs/60000);
  let seconds = Math.floor(inputToMs%60);
  min = (min < 10 ? "0" : "") + min;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  timerDisplay.innerHTML = min+":"+seconds;
}
function updateDisplay() {
  let min = Math.floor(timeLeft/60000);
  let seconds = Math.floor(timeLeft/1000)%60;
  min = (min < 10 ? "0" : "") + min;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  timerDisplay.innerHTML = min+":"+seconds;
}

function pauseOrResume() {
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
}

function handleTime(e) {
  // debugger;
  if(!e.currentTarget.classList.contains('customTime')) {
    customFormContainer.classList.remove('reveal');
    console.log(e.currentTarget.getAttribute('aria-time'));
  }
  timeSelected.forEach(button => button.classList.remove('selected'));
  e.currentTarget.classList.add('selected');
  timerValue = document.querySelector('.timeWrap .selected').getAttribute('aria-time');
 
  if(!e.currentTarget.classList.contains('customTime')) {
  updateDisplayBefore(timerValue);
  timeLeftSeconds = timerValue * 60;
  }
}


function init() {
  
  timeSelected.forEach(button => {
    button.addEventListener('click', handleTime);
  });
  updateDisplayBefore(timerValue);
  // updateDisplayBeforeStart();

  startNextBtn.addEventListener('click', startNextMin);
  resetBtn.addEventListener('click', resetTimer);
}
startTimerBtn.addEventListener('click', pauseOrResume);
init(); 

customTimeBtn.addEventListener('click', showCustomForm);
scheduleTimeBtn.addEventListener('click',showScheduleForm);
customForm.addEventListener('submit', handleCustomFormSubmit);
scheduleForm.addEventListener('submit', handleScheduleTimeSubmit);
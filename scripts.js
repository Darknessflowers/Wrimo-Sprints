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
let resetBtn =  document.querySelector('#reset');
let requestPermissionBtn = document.querySelector('#requestPermission');
let notificationImg = './favicon.png';
let notificationText = 'Time up!';
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
      notificationText = 'Time up!';
      playNotification();
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
  clearInterval(startNextMinTimer);
  startNextBtn.innerText = `Start next min`;
  clearInterval(timer);
  isTimerRunning = false;
  timeLeft = 0;
  startTimerBtn.innerText = 'Start';
  // updateDisplay();
  updateDisplayBeforeStart();
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
        notificationText = 'Start writing!';
        playNotification();
        startNextBtn.innerText = `Write!`;
        clearInterval(startNextMinTimer);
        startTimer(timeLeftSeconds);
    }
  }, 1000);
}

function playNotification() {
  new Notification('Writing Sprints Timer', { body: notificationText, vibrate: [200, 100, 200], icon: notificationImg });
}


function scheduleTimer() {

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
  min = (min < 10 ? "0" : "") + min;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  timerDisplay.innerHTML = min+":"+seconds;
}



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

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }

  return true;
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }
    // set the button to shown or hidden, depending on what the user answers
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
        requestPermissionBtn.style.display = 'block';
    } else {
      requestPermissionBtn.style.display = 'none';
    }
  }
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
    requestPermissionBtn.style.display = 'none';
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
      .then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

function init() {
  timerForm.addEventListener('change', function() {
    // update timer value when radio button is selected
    timerValue = document.querySelector("input[name='sprint-length']:checked");
    console.log(timerValue.value);
    //convert min to seconds
    timeLeftSeconds = timerValue.value * 60;
    updateDisplayBeforeStart();
  });

    // Ask for permission to show notifications
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    requestPermissionBtn.style.display = 'none';
  } else {
    requestPermissionBtn.addEventListener('click', askNotificationPermission);
  }

  updateDisplayBeforeStart();

  startNextBtn.addEventListener('click', startNextMin);
  resetBtn.addEventListener('click', resetTimer);
  requestPermissionBtn.addEventListener('click', askNotificationPermission);
}

init(); 


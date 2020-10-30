var wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));
let requestPermissionBtn = document.querySelector('#requestPermission');

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});


const pageTitle = document.querySelector('h1');

function getRandomBetween(min = 70, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

function draw(el) {
  // debugger;
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    ++index;
    if (index <= text.length) {
      const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
      await wait(amountOfTimeToWait);
      drawLetter();
    }
  }
  drawLetter();
}

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }

  return true;
}
function checkPermission() {
    // set the button to shown or hidden, depending on what the user answers
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      requestPermissionBtn.style.display = 'block';
  } else {
    requestPermissionBtn.style.display = 'none';
  }
}
function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }
    checkPermission();
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

checkPermission();
// Ask for permission to show notifications
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
requestPermissionBtn.style.display = 'none';
} else {
requestPermissionBtn.addEventListener('click', askNotificationPermission);
}

requestPermissionBtn.addEventListener('click', askNotificationPermission);

draw(pageTitle);

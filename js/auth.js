
// signup
const signUpForm = document.querySelector('#signup-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

function setupUi(user) {
if(user) {
  //toggle ui elements
  loggedInLinks.forEach(link => link.style.display = 'block');
  loggedOutLinks.forEach(link => link.style.display = 'none');
} else {
    //toggle ui elements
    loggedInLinks.forEach(link => link.style.display = 'none');
    loggedOutLinks.forEach(link => link.style.display = 'block');
}
}


signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //get user info
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;

  console.log(email, password);

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signUpForm.reset();
  });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    //close the login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
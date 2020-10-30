

const table = document.querySelector('.sprintData');
const tableTen = document.querySelector('.sprintDataTen');

//create element and render

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderSprint(doc, location) {
let tr = document.createElement('tr');
let words = document.createElement('td');
let dateFormatted = document.createElement('td');
let sprLength = document.createElement('td');
let dateReadable = new Date(doc.data().date);

tr.setAttribute('data-id', doc.id);
words.textContent = doc.data().words;
dateFormatted.textContent = `${dateReadable.getDate()} ${months[dateReadable.getMonth()]} ${dateReadable.getFullYear()}`;
sprLength.textContent = doc.data().sprLength + ' min';

tr.appendChild(dateFormatted);
tr.appendChild(sprLength);
tr.appendChild(words);

location.appendChild(tr); 
}

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    setupUi(user);
    //user exists
    console.log('user logged in :', user);
    // getting data      
      db.collection('sprints-data').orderBy("date", "desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          // console.log(doc.data());
          renderSprint(doc, table);
        })
      });

      db.collection('sprints-data').where("sprLength", "==", 10).orderBy("date", "desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          // console.log(doc.data());
          renderSprint(doc, tableTen);
        })
      });   
  } else {
    setupUi(user);
    console.log('user logged out');
    document.querySelector('#bodyWrap').innerHTML = `
    <h1>Sprint Data</h1>
    
    <p>You need to be logged in to view this data.</p>`;
  }
});

// var myLineChart = new Chart(ctx, {
//   type: 'line',
//   data: data,
//   options: options
// });

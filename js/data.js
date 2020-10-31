

const table = document.querySelector('.sprintData');
const tableTen = document.querySelector('.sprintDataTen');

//create element and render

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function renderSprint(doc, location) {
// let toAppend = location.querySelector('.tableTop');
// let tr = document.createElement('tr');
// let words = document.createElement('td');
// let dateFormatted = document.createElement('td');
// let sprLength = document.createElement('td');
// let dateReadable = new Date(doc.data().date);

// tr.setAttribute('data-id', doc.id);
// tr.classList.add('sprintData');
// words.textContent = doc.data().words;
// dateFormatted.textContent = `${dateReadable.getDate()} ${months[dateReadable.getMonth()]} ${dateReadable.getFullYear()}`;
// sprLength.textContent = doc.data().sprLength + ' min';

// tr.appendChild(dateFormatted);
// tr.appendChild(sprLength);
// tr.appendChild(words);

// let child = toAppend.firstElementChild;
// console.log(toAppend);
// toAppend.appendChild(tr); 
// }

function renderSprint(data, location) {
  if(data.length) {
    let html = 
    `<tr>
            <th>Date</th>
            <th>Length</th>
            <th>Words</th>
            <th>WPM</th>
    </tr>`;

    data.forEach(doc => {
      let words = doc.data().words;
      let length = doc.data().sprLength;
      let wpm = (Math.round(words/length).toFixed(2));
      let dateReadable = new Date(doc.data().date);
      const sprintInfo = doc.data();
      const row = `
      <tr>
      <td>${dateReadable.getDate()} ${months[dateReadable.getMonth()]} ${dateReadable.getFullYear()} </td>
      <td>${doc.data().sprLength} min</td>
      <td>${doc.data().words}</td>
      <td>${wpm}</td>
      </tr>
      `;
      html += row;
    });
    location.innerHTML = html;
  }
}

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    setupUi(user);
    //user exists
    console.log('user logged in :', user);
    // getting data      
      db.collection('sprints-data').orderBy("date", "desc").onSnapshot((snapshot) => {
        renderSprint(snapshot.docs, table);
      });

      db.collection('sprints-data').where("sprLength", "==", 10).orderBy("date", "desc").onSnapshot((snapshot) => {
        renderSprint(snapshot.docs, tableTen);
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

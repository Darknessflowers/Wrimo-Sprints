Chart.defaults.global.legend.display = false;

let allWordsData = [];
let allDateData = [];
let fiveMinWordsData = [];
let fiveMinDateData = [];
let tenMinWordsData = [];
let tenMinDateData = [];
let fifteenMinWordsData = [];
let fifteenMinDateData = [];
let twentyMinWordsData = [];
let twentyMinDateData = [];
let thirtyMinWordsData = [];
let thirtyMinDateData = [];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function loadChart(num, wordsArray, dateArray) {
  // console.log(`#${num}Chart`);
  const ctx = document.querySelector(`#${num}Chart`);
// const ctx = document.getElementById('tenChart').getContext('2d');
  const chart = new Chart(ctx, {
  type: 'bar',
  data: {
      // labels: ['8th October', '9th October', '10th October', '11th October', '20th October'],
      labels: dateArray.reverse(),
      datasets: [{
          label: 'Words Written',
          barPercentage: 1,
          categoryPercentage: 0.9,
          // data: [515, 520, 614, 617, 555],
          data: wordsArray.reverse(),
          backgroundColor: [
              '#431169',
              '#57168A',
              '#701DAF',
              '#9A3EE0',
              '#A259D9',
              '#B573E8',
              '#BE84EB',
              '#CB9DEF',
              '#D5B1F2',
              '#CB9DEF',
              '#BE84EB',
              '#B573E8',
              '#A259D9',
              '#9A3EE0',
              '#701DAF',
              '#57168A',
              '#431169',
              '#57168A',
              '#701DAF',
              '#9A3EE0',
              '#A259D9',
              '#B573E8',
              '#BE84EB',
              '#CB9DEF',
              '#D5B1F2',
              '#CB9DEF',
              '#BE84EB',
              '#B573E8',
              '#A259D9',
              '#9A3EE0',
              '#701DAF',
              '#57168A',
              '#431169',
          ],
          borderColor: [
            '#431169',
            '#57168A',
            '#701DAF',
            '#9A3EE0',
            '#A259D9',
            '#B573E8',
            '#BE84EB',
            '#CB9DEF',
            '#D5B1F2',
            '#CB9DEF',
            '#BE84EB',
            '#B573E8',
            '#A259D9',
            '#9A3EE0',
            '#701DAF',
            '#57168A',
            '#431169',
            '#57168A',
            '#701DAF',
            '#9A3EE0',
            '#A259D9',
            '#B573E8',
            '#BE84EB',
            '#CB9DEF',
            '#D5B1F2',
            '#CB9DEF',
            '#BE84EB',
            '#B573E8',
            '#A259D9',
            '#9A3EE0',
            '#701DAF',
            '#57168A',
            '#431169',
          ],
          borderWidth: 1
      },]
    },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      
  }
});
}

function renderChart(doc, wordsArray, dataArray, num) {
  // console.log(doc);
  if(doc.exists) {
    let dateReadable = new Date(doc.data().date);
    wordsArray.push(doc.data().words);
    dataArray.push(`${dateReadable.getDate()} ${months[dateReadable.getMonth()]}`);
  } else {
    console.log('No data for this');
  }
}




// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    setupUi(user);
    //! future: get user. User is associated to a collection (stored in array?)
    //! get name of collection and assign to variable. pull through when grabbing data

      // All data CHART
      // db.collection('sprints-data').orderBy("date", "desc").get().then((snapshot) => {
      //   let chart = document.querySelector('#chart-all');
      //   if(snapshot.size) {
      //     chart.classList.remove('hidden');
      //     snapshot.docs.forEach(doc => {
      //     renderChart(doc, allWordsData, allDateData, 'all');
      //     })
      //     loadChart('all', allWordsData, allDateData);
      //   } else {
      //     document.querySelector('#chart-all').innerHTML = '';
      //     document.querySelector('#chart-all').style.display = 'none';
      //   }
      // });

    // 5 MIN CHART
    db.collection('sprints-data').where("sprLength", "==", 5).orderBy("date", "desc").get().then((snapshot) => {
      let chart = document.querySelector('#chart-ten');
      if(snapshot.size) {
        chart.classList.remove('hidden');
        snapshot.docs.forEach(doc => {
        renderChart(doc, fiveMinWordsData, fiveMinDateData, 'five');
        })
        loadChart('five', fiveMinWordsData, fiveMinDateData);
      } else {
        document.querySelector('#chart-five').innerHTML = '';
        document.querySelector('#chart-five').style.display = 'none';
      }
    });

    // 10 MIN CHART
    db.collection('sprints-data').where("sprLength", "==", 10).orderBy("date", "desc").onSnapshot((snapshot) => {
      let chart = document.querySelector('#chart-ten');
      console.log(snapshot.size);
      if(snapshot.size) {
        chart.classList.remove('hidden');
        console.log(chart.classList);
        snapshot.docs.forEach(doc => {
          renderChart(doc, tenMinWordsData, tenMinDateData, 'ten');
        })
        loadChart('ten', tenMinWordsData, tenMinDateData);
        console.log(chart.classList);
      } else {
        chart.innerHTML = '';
      }  
    });

     // 15 MIN CHART
     db.collection('sprints-data').where("sprLength", "==", 15).orderBy("date", "desc").get().then((snapshot) => {
      let chart = document.querySelector('#chart-fifteen');
      if(snapshot.size) {
        chart.classList.remove('hidden');
        snapshot.docs.forEach(doc => {
          renderChart(doc, fifteenMinWordsData, fifteenMinDateData, 'fifteen');
        })
        loadChart('fifteen', fifteenMinWordsData, fifteenMinDateData);
      } else {
        document.querySelector('#chart-fifteen').innerHTML = '';
        document.querySelector('#chart-fifteen').style.display = 'none';
      }  
    });

    // 20 MIN CHART
    db.collection('sprints-data').where("sprLength", "==", 20).orderBy("date", "desc").get().then((snapshot) => {
      let chart = document.querySelector('#chart-twenty');
      if(snapshot.size) {
        chart.classList.remove('hidden');
        snapshot.docs.forEach(doc => {
          renderChart(doc, twentyMinWordsData, twentyMinDateData, 'twenty');
        })
        loadChart('twenty', twentyMinWordsData, twentyMinDateData);
      } else {
        document.querySelector('#chart-twenty').innerHTML = '';
        document.querySelector('#chart-twenty').style.display = 'none';
      }  
    });

    // 30 MIN CHART
    db.collection('sprints-data').where("sprLength", "==", 30).orderBy("date", "desc").get().then((snapshot) => {
      let chart = document.querySelector('#chart-thirty');
      if(snapshot.size) {
        chart.classList.remove('hidden');
        snapshot.docs.forEach(doc => {
          renderChart(doc, thirtyMinWordsData, thirtyMinDateData, 'thirty');
        })
        loadChart('thirty', thirtyMinWordsData, thirtyMinDateData);
      } else {
        document.querySelector('#chart-thirty').innerHTML = '';
        document.querySelector('#chart-thirty').style.display = 'none';
      }  
    });

  } else {
    // hide everything if logged out
    console.log('user logged out');
    setupUi(user);
    document.querySelector('#bodyWrap').innerHTML = `
    <h1>Graphs</h1>
    <p>You need to be logged in to view this data.</p>`;
  }
});
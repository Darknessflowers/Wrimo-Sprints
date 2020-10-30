 // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyAhyFkLMRzxzPzjBKzhfc4mNbiD-uWFZAQ",
        authDomain: "writing-sprints-timer.firebaseapp.com",
        databaseURL: "https://writing-sprints-timer.firebaseio.com",
        projectId: "writing-sprints-timer",
        storageBucket: "writing-sprints-timer.appspot.com",
        messagingSenderId: "516330839432",
        appId: "1:516330839432:web:008456df6394d7b65dee3d",
        measurementId: "G-1BHYLGDR0H",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      const auth = firebase.auth();
      const db = firebase.firestore();

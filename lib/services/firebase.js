const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyDAXfd_xOZyweZ07UNqjuESfMhBMg9Y9EQ",
  authDomain: "reactredux-backend.firebaseapp.com",
  databaseURL: "https://reactredux-backend.firebaseio.com",
  projectId: "reactredux-backend",
  storageBucket: "reactredux-backend.appspot.com",
  messagingSenderId: "828230727650"
};

module.exports = {
	firebaseApp: firebase.initializeApp(config),
	database: firebase.database().ref("Tasks")
}

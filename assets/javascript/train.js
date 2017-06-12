 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAt4v_1kF0eTuFyGY9BIKJmqTYzOwY8AXY",
    authDomain: "trainschedule-387f8.firebaseapp.com",
    databaseURL: "https://trainschedule-387f8.firebaseio.com",
    projectId: "trainschedule-387f8",
    storageBucket: "trainschedule-387f8.appspot.com",
    messagingSenderId: "741028564328"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trnName = $("#train-name-input").val().trim();
  	var trnDestination = $("#destination-input").val().trim();
  	var trnFirstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
  	var trnFrequency = $("#frequency-input").val().trim();

  	var newTrain = {
  		name: trnName,
  		destination: trnDestination,
  		first: trnFirstTime,
  		frequency: trnFrequency
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.first);
  	console.log(newTrain.frequency);

  	alert("New Train Successfully Added");

  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#first-train-time-input-input").val("");
  	$("#frequency-input").val("");
  });
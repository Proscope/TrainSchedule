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
  	var trnFirstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
  	var trnFrequency = $("#frequency-input").val().trim();

  	var newTrain = {
  		name: trnName,
  		destination: trnDestination,
  		first: trnFirstTime,
  		frequency: trnFrequency,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.first);
  	console.log(newTrain.frequency);

  	alert("New Train Successfully Added");

  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#first-train-time-input").val("");
  	$("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  	console.log(childSnapshot.val());

  	var trnName = childSnapshot.val().name;
  	var trnDestination = childSnapshot.val().destination;
  	var trnFirstTime = childSnapshot.val().first;
  	var trnFrequency = childSnapshot.val().frequency;

  	console.log(trnName);
  	console.log(trnDestination);
  	console.log(trnFirstTime);
  	console.log(trnFrequency);

    var diffTime = moment().diff(moment.unix(trnFirstTime), "minutes");
    var tRemain = moment().diff(moment.unix(trnFirstTime), "minutes") % trnFrequency;
    var minutes = trnFrequency - tRemain;
    var nextArrival = moment().add(minutes, "m").format("hh:mm A");

   //  var frequency = parseInt(frequency);

  	// var firstTime = moment(trnFirstTime, "HH:mm").subtract(1, "years");
   //  console.log(firstTime);

   //  var presentTime = moment();
   //  console.log("Current Time: " + moment(presentTime).format("HH:mm"));

   //  var differenceInTime = moment().diff(moment(firstTime), "minutes");
   //  console.log("Time Difference: " + differenceInTime);

   //  var timeRemainder = differenceInTime % trnFrequency;
   //  console.log(timeRemainder);

   //  var minutesForTrain = trnFrequency - timeRemainder;
   //  console.log("Minutes for the next train: " + minutesForTrain);

   //  var trnAway = moment().add(minutesForTrain, "minutes");
   //  console.log("Next Train Arrives: " + moment(trnAway).format("HH:mm"));


  	// var trnArrival = moment(trnAway).format("HH:mm");


  	$("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");
  });
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCdZmUEWWDBkkYe_tMkmx_HR1RifY58IHc",
    authDomain: "trainactivity-39ba3.firebaseapp.com",
    databaseURL: "https://trainactivity-39ba3.firebaseio.com",
    projectId: "trainactivity-39ba3",
    storageBucket: "trainactivity-39ba3.appspot.com",
    messagingSenderId: "342181027140",
    appId: "1:342181027140:web:cd584c0a55f95d7049cb11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database()

//   .on is an event listener
database.ref().on("child_added", function (snapshot) {
    var trainName = snapshot.val().trainName
    var destination = snapshot.val().destination
    var firstTrain = snapshot.val().firstTrain
    var frequency = snapshot.val().frequency
    var tr = $("<tr>")
    var td1 = $("<td>")
    td1.html(trainName)
    var td2 = $("<td>")
    td2.html(destination)


    var td3 = $("<td>")
    td3.html(frequency)

    // Assumptions
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrain = moment(nextTrain).format("hh:mm A")

    var td4 = $("<td>")
    td4.html(nextTrain)
    var td5 = $("<td>")
    td5.html(tMinutesTillTrain)

    tr.append(td1, td2, td3, td4, td5)



    $("#train-table-rows").append(tr)
})

$("#submit").on("click", function (event) {
    event.preventDefault()
    var trainName = $("#train-name").val()
    var destination = $("#destination").val()
    var frequency = $("#frequency").val()
    var firstTrain = $("#first-train").val()
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    })
})
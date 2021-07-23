console.log("running");

const submit = document.querySelector("#addEvent");

const addEvent = (name, time, location, description) => `
  <div class="tile is-parent is-10">
    <div class="tile is-child notification is-info">
      <p class="title">${name}</p>
      <p class="subtitle"><b>Time/Date: </b>${time}</p>
      <p class="subtitle"><b>Location: </b>${location}</p>
      <div class="content">
        <b>Description: </b>
        ${description}
      </div>
    </div>
  </div>
`

//Display events from database
const eventList = firebase.database().ref(); //<--CLOUDSHELL
/*const eventList = [
  {
    name: "birthday party",
    time: "Friday at 3pm",
    location: "my house",
    description: "it's my birthday",
  }, {
    name: "event",
    time: "time",
    location: "location",
    description: "description",
  }
]*/

let newHTML = "";

eventList.forEach(event => {
  newHTML += addEvent(event.name, event.time, event.location, event.description);
})
document.querySelector("#eventsList").innerHTML = newHTML

submit.addEventListener("click", () => {
  //create new event object and add to database
  const eventName = document.querySelector("#addName")
  const eventTime = document.querySelector("#addTime")
  const eventLocation = document.querySelector("#addLocation")
  const eventDescription = document.querySelector("#addDescription")
  
  const newEvent = {
    name: eventName.value,
    time: eventTime.value,
    location: eventLocation.value,
    description: eventDescription.value,
  }
  
  console.log(newEvent.name, newEvent.time, newEvent.location, newEvent.description);
  
  //save newEvent to firebase
  firebase.database().ref().push(newEvent); //<--CLOUDSHELL
  
  eventName.value = "";
  eventTime.value = "";
  eventLocation.value = "";
  eventDescription.value = "";
})


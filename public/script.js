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

// eventList.on('value', (snapshot) => {
//         const data = snapshot.val()
//         console.log(data)
//         for (let key in data) {
//             console.log(key, data[key])
//                 const location = document.querySelector("#location");
//                             console.log(data[key].location);
//                 const event = document.querySelector("#event");
//                             console.log(data[key].event);
//                 const time = document.querySelector("#time");
//                             console.log(data[key].time);
//                 const notes = document.querySelector("#notes");
//                 message.innerHTML = data[key].notes;
            
//         }
//     })

    eventList.on('value', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        for (let key in data) {
            console.log(key, data[key])
            newHTML += addEvent(key.name, key.time, key.location, key.description);
        }
    })
    
//eventList.forEach(event => {
  //newHTML += addEvent(event.name, event.time, event.location, event.description);
//})
const messagesRef = firebase.database().ref();
document.querySelector("#eventList").innerHTML = newHTML

submit.addEventListener("click", () => {
  //create new event object and add to database
  const eventName = document.querySelector("#addEvent")
  const eventTime = document.querySelector("#addTime")
  const eventLocation = document.querySelector("#addLocation")
  const eventDescription = document.querySelector("#addNotes")
  
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


const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

export function getAppointmentsForDay(state, day) {
  //find the object in state.days array whose name matches provided day => now we can access that day's appointment array.
  const filteredDays = state.days.filter(today => today.name === day);
  
  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return [];
  }
  const apptsArray = (filteredDays[0].appointments); //returns day object containing appointments (also array)
  
  const dayAppts = []; 
  for (const appt of Object.values(state.appointments)) {
    if (apptsArray.includes(appt.id)) {
      dayAppts.push(appt);
    }
   }
   return dayAppts;
  }



export function getInterview(state, interview) {

if (![interview] || interview === null) {
  return null
}
return {
  ...interview,
  interviewer: state.interviewers[interview.interviewer]
}
}
//console.log(getInterview(state, 3))

import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];



export default function Application(props) {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});

const setDay = day => setState({ ...state, day});
const dailyAppointments = getAppointmentsForDay(state, state.day);

// const setDays = days => setState(prev => ({...prev, days }))


  const [interviewer, setInterviewer] = useState();
  const mappedAppts = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return(
    <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
    );
});
  
    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("api/appointments"),
        axios.get("api/interviewers")
      ])
      .then((response) => {
        console.log("response", response)
        setState(prev => ({
          ...prev,
          days: response[0]["data"],
          appointments: response[1]["data"],
          interviewers: response[2]["data"]
        }))
      })
    }, []);
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>

<InterviewerList
 interviewers={interviewers}
 setInterviewer={setInterviewer}
 interviewer={interviewer}
  />

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {mappedAppts}
      </section>
    </main>
  );
  
}

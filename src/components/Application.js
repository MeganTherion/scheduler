import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((response) => {
      //console.log("response", response);
      setState((prev) => ({
        ...prev,
        days: response[0]["data"],
        appointments: response[1]["data"],
        interviewers: response[2]["data"],
      }));
    });
  }, []);

  // const setDays = days => setState(prev => ({...prev, days }))

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("saving");
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      console.log("saved");
      setState({ ...state, appointments });
    });
  }

  function deleteAppointment(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(()=> {
      setState(prev => ({ ...prev, appointments }));
      Promise.all([axios.get(`/api/days`)])
      .then(([days]) => {
        setState(prev => ({
          ...prev,
          days: days.data
        }));
      });
    });
  }

  // function editAppointment(id, appointment) {

  //   const appointment = {
  //     ...state.appointments[id]
  //   };
  //   return axios.put(`/api/appointments/${id}`, { appointment }).then(() => {
  //     console.log("editing from app.js");
  //     setState(prev => ({ ...prev, appointments}));
  //   });
  // }
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const mappedAppts = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteAppointment={deleteAppointment}
        // editAppointment={editAppointment}
      />
    );
  });

  

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{mappedAppts}</section>
    </main>
  );
}
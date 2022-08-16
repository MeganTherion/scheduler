import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      console.log("response", response);
      setState((prev) => ({
        ...prev,
        days: response[0]["data"],
        appointments: response[1]["data"],
        interviewers: response[2]["data"],
      }));
    });
  }, []);

  // const setDays = days => setState(prev => ({...prev, days }))
  
  
  function spotsRemaining(id, appointments) {
    console.log("appointments", appointments);
    const currentDay = state.days.find((day) => day.appointments.includes(id))
    const dayIndex = state.days.indexOf(currentDay);
    let counter = 0
    for (let apptID of currentDay.appointments) {
      if (appointments[apptID].interview === null) {

       counter ++
      }
    }
    const fakeDay = {...currentDay, spots:counter}
    
    const days = [...state.days]
    days[dayIndex] = fakeDay;
    console.log("days", days)
    return days;
  }
  


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotsRemaining(id, appointments);
    
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
      
    });
  }

  function deleteAppointment(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotsRemaining(id, appointments);
    
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, deleteAppointment };
}

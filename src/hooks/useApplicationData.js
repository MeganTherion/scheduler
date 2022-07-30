import { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
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
  return  { state, setDay, bookInterview, deleteAppointment };
};
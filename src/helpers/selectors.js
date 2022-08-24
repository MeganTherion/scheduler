export function getAppointmentsForDay(state, day) {
  //find the object in state.days array whose name matches provided day => now we can access that day's appointment array.
  const filteredDays = state.days.filter((today) => today.name === day);

  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return [];
  }
  const apptsArray = filteredDays[0].appointments; //returns day object containing appointments (also array)

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
    return null;
  }
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
}


export function getInterviewersForDay(state, day) {
  //find the object in state.days array whose name matches provided day => now we can access that day's appointment array.
  const filteredDays = state.days.filter((today) => today.name === day);
  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return [];
  }
  const interviewersArray = filteredDays[0].interviewers; //returns day object containing appointments (also array)
  return interviewersArray.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
}

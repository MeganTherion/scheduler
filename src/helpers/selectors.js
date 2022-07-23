
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


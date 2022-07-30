import { useState } from "react";

export default function useVisualMode(initial) {
  //take an initial mode
  const [mode, setMode] = useState(initial); //set the mode state with initial mode provided
  const [history, setHistory] = useState([initial]);

  // setMode(() => initial);
  function transition(mode, replace = false) {
    //takes in a new mode
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    }
    setMode(() => mode); //update mode state with the new value
  }

  function back() {
    if (history[history.length - 1] !== initial) {
      history.pop();
    }
    setMode(() => history[history.length - 1]);
  }
  return { mode, transition, back }; //returns object with mode property (can also look like { mode: mode })
}

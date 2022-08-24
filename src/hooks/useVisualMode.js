import { useState } from "react";

export default function useVisualMode(initial) {
  //take an initial mode
  const [history, setHistory] = useState([initial]);

  // setMode(() => initial);
  function transition(mode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    }
    // setMode(() => mode); //update mode state with the new value
  }

  function back() {
    if (history.length >= 2) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }
  return { mode: history[history.length - 1], transition, back }; //returns object with mode property (can also look like { mode: mode })
}

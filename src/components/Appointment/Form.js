import React, { useState } from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";
import classNames from "classnames";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };
  
  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={student}
        type="text"
        value={student}
        placeholder="Enter Student Name"
        onChange={e => setStudent(e.target.value)}
        
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={reset}>Save</Button>
    </section>
  </section>
</main>
  );
};
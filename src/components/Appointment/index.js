import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)});
  }

  function deleting() {
    transition(CONFIRM, true);
    props.deleteAppointment(props.id)
      .then(()=>{transition(EMPTY)});
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
      <Empty onAdd={() => {console.log("onAdd"); transition(CREATE)}} />}
      {mode === SAVING && <Status />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm  
          onCancel={back}
          onConfirm={deleting}
          />
      )}
    </article>
  );
}
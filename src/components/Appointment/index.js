import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

  function deleteAppt(name, interviewer) {
    const interview ={
      student: name,
      interviewer
    };
    transition(DELETING, true)
    props.deleteAppointment(props.id, interview)
    .then(() => {
      transition(EMPTY)
    })
  }
  
  // function editAppt(name, interviewer) {
  // const interview ={
  //   student: name,
  //   interviewer: interviewer,
  // }
  // transition(EDIT)
  //   props.bookInterview(props.id, interview)
  //   .then(() => {
  //     transition(() => back())
  //   })
    
  //   }
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("onAdd"); 
        transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          // onEdit={editAppt}
          
        />
      )}
      {mode === SAVING && (
        <Status
        message="Saving..."
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Are you sure you want to delete?"
        onCancel={() => back()}
        onConfirm={deleteAppt}
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interviewers.interviewer}
        bookInterview={props.bookInterview}
        onCancel={back}
        onSave={save}
        //onEdit={() => transition(SHOW)}
        
        />
      )}

    </article>
  );
}
import React from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";
import classNames from "classnames";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Confirm(props) {
  return(
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel}>Cancel</Button>
    <Button danger onClick={props.onConfirm}>Confirm</Button>
  </section>
</main>
  );
};
import React from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";
import classNames from "classnames";

export default function Application(props) {
  return(
    <header className="appointment__time">
  <h4 className="text--semi-bold">{props.time}</h4>
  <hr className="appointment__separator" />
</header>
  );
};
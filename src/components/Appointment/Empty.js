import React from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";
import classNames from "classnames";

export default function Empty(props) {
  return(
    <main className="appointment__add">
      <img className="appointment__add-button"
      onClick={props.onAdd}
      src="images/add.png"
      alt="Add"
    />
    </main> 
  );
};
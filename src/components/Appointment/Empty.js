import React from "react";
import "components/Appointment/styles.scss";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        onClick={props.onAdd}
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}

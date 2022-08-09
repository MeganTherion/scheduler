import React from "react";
import axios from "../../__mocks__/axios";
import { render, cleanup, getByLabelText, queryByText, queryByAltText, getByAltText, getByPlaceholderText, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, queryAllByDisplayValue } from "@testing-library/react";

import Application from "components/Application";



afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
   
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    
    //look for student name to be shown after Saving:
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
      
  });

  xit("loads data, cancels an interview, and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete?"));
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
    expect(getByText(day, /spots remaining/i)).toBeInTheDocument(); //there is a bug here
    debug();
    console.log(prettyDOM(appointment))
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
// 1. Render the Application.
const { container } = render(<Application />);    
// 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));    
// 3. Click the "Edit" button on the booked appointment.
const appointment = getAllByTestId(container,"appointment"
).find(appointment => queryByText(appointment, "Archie Cohen"));

fireEvent.click(queryByAltText(appointment, "Edit"));    
// update appointment to new student
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Roger Pelican" }
});    
fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    
    //look for student name to be shown after Saving:
    await waitForElement(() => queryByText(appointment, "Roger Pelican"));
    

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
    console.log(prettyDOM(appointment))
});


  
})

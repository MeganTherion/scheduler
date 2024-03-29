import React from "react";
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent, queryByAltText } from "@testing-library/react";
import Form from "components/Appointment/Form";


afterEach(cleanup);

describe("Form", () => {

  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={ interviewers } student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={ interviewers } onSave={onSave} />
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled(); //this test failing because i haven't implemented functionality for this
  });

  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();

    const { getByText } = render(
      <Form interviewers={ interviewers } student="Lydia Miller-Jones" onSave={onSave} />
    );
      fireEvent.click(getByText("Save"));
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  // TESTS BELOW REPLACED BY MORE USEFUL TEST ABOVE WITH GREATER COVERAGE //
  // it("calls onSave function when the name and interviewer is defined", () => {
  //   /* 1. Create the mock onSave function */
  // const onSave = jest.fn()
  //   /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
  // const { getByText, queryByText } = render(
  //   <Form interviewers={interviewers} interviewer={interviewers[0].id} student="Lydia Miller-Jones" onSave={onSave} />
  // );
  //   fireEvent.click(getByText("Save"));
  //   /* 3. Click the save button */
  
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(queryByText(/please select an interviewer/i)).toBeNull();
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
  //   );

  //   const input = getByPlaceholderText("Enter Student Name");

  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } })
  //   fireEvent.click(getByText("Save"));

  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1)
  // })
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});



// it.skip("renders without crashing", () => {
//   render(<Application />);
// });

// it("renders without crashing", () => {
//   const { getByText } = render(<Button confirm>Confirm</Button>);
//   expect(getByText("Confirm")).toHaveClass("button--confirm");
// });

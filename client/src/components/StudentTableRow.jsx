import React from "react";

const StudentTableRow = ({ student }) => {
  const { firstName, lastName, course, sex, scholarship, dob } = student;

  const scholarshipStr = scholarship ? "Yes" : "No";

  function dateStrRender(date) {
    return date.slice(0, 10);
  }

  function sexStrRender(str) {
    let sexStr;
    if (str === "M") sexStr = "Male";
    if (str === "F") sexStr = "Female";
    if (str === "O") sexStr = "Other/Not specified";
    if (str === "N") sexStr = "Non binary";
    return sexStr;
  }

  return (
    <tr>
      <th>{firstName}</th>
      <th>{lastName}</th>
      <th>{course}</th>
      <th>{sexStrRender(sex)}</th>
      <th>{dateStrRender(dob)}</th>
      <th>{scholarshipStr}</th>
    </tr>
  );
};

export default StudentTableRow;

import React from "react";

const StudentTableRow = ({ student }) => {
  const {
    stringId,
    firstName,
    lastName,
    course,
    sex,
    scholarship,
    dob
  } = student;

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
      <th className="font-thin tracking-widest">{stringId}</th>
      <th className="font-normal">{firstName}</th>
      <th className="uppercase tracking-wider">{lastName}</th>
      <th className="font-normal">{course}</th>
      <th className="font-thin">{sexStrRender(sex)}</th>
      <th className="font-normal">{dateStrRender(dob)}</th>
      <th
        className={`${scholarship ? "font-semibold uppercase" : "font-normal"}`}
      >
        {scholarshipStr}
      </th>
    </tr>
  );
};

export default StudentTableRow;

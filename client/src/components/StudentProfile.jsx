import React from "react";

import CloseIcon from "@mui/icons-material/Close";

const StudentProfile = ({ profiledStudent }) => {
  const {
    firstName,
    lastName,
    sex,
    dob,
    scholarship,
    course,
    photo
  } = profiledStudent;

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
    <div className="student-profile">
      <CloseIcon />
      <div>
        <h3>
          <span className="uppercase font-semibold">{lastName}</span>,
          {firstName}
        </h3>
      </div>
    </div>
  );
};

export default StudentProfile;

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import CakeIcon from "@mui/icons-material/Cake";
import GradeIcon from "@mui/icons-material/Grade";
import SchoolIcon from "@mui/icons-material/School";
import Tooltip from "@mui/material/Tooltip";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import WorkIcon from "@mui/icons-material/Work";

const AVATAR_BASE_URL = "https://i.pravatar.cc/300?u=";

const getAge = birthDateString => {
  const today = new Date();
  const birthDate = new Date(birthDateString);

  const yearsDifference = today.getFullYear() - birthDate.getFullYear();

  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  return isBeforeBirthday ? yearsDifference - 1 : yearsDifference;
};

const PersonProfile = ({ profiledPerson, dispatch }) => {
  const {
    startDate,
    stringId,
    firstName,
    lastName,
    sex,
    dob,
    scholarship,
    course,
    photo,
    courses
  } = profiledPerson;

  function dataCleaner(date) {
    const d = new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10));
    return d.toDateString().slice(4);
  }

  function sexStrRender(str) {
    let sexStr;
    if (str === "M") sexStr = "Male";
    if (str === "F") sexStr = "Female";
    if (str === "O") sexStr = "Other/Not specified";
    if (str === "N") sexStr = "Non binary";
    return sexStr;
  }

  const coursesTaught = courses?.split(",");
  const unsetProfiledIdHandler = () => dispatch({ type: "UNSET_PROFILED_ID" });

  return (
    <div className="person-profile">
      <div className="profile-close-box">
        <Tooltip title="close details">
          <CloseIcon fontSize="large" onClick={unsetProfiledIdHandler} />
        </Tooltip>
      </div>
      <div>
        <img
          src={`${AVATAR_BASE_URL}${photo}`}
          alt="personal photo"
          onClick={unsetProfiledIdHandler}
        />
        <div className="p-5">
          <h3 className="text-3xl mt-5 flex items-center gap-3">
            <div>
              <span className="uppercase font-semibold">{lastName}</span>,{" "}
              {firstName}
            </div>
            {courses && (
              <Tooltip title="tutor">
                <SchoolIcon />
              </Tooltip>
            )}
          </h3>
          <ul className="flex flex-col gap-5 mt-3 text-xl">
            <li>
              <div className="flex gap-3 items-center">
                <Tooltip title="ID number">
                  <RememberMeIcon />
                </Tooltip>
                {stringId}
              </div>
            </li>
            {courses && (
              <li className="flex gap-3 items-center">
                <Tooltip title="Start of employment">
                  <WorkIcon />
                </Tooltip>
                {dataCleaner(startDate)} ({">"}
                {getAge(startDate)}y)
              </li>
            )}
            {course && <li className="text-2xl">{course}</li>}
            <li className="flex gap-3 items-center">
              <Tooltip title="date of birth">
                <CakeIcon />
              </Tooltip>
              {dataCleaner(dob)} ({getAge(dob)}y)
            </li>
            <li>{sexStrRender(sex)}</li>
            {scholarship === 1 && (
              <li className="badge badge-neutral text-xl p-4 flex gap-2">
                <GradeIcon /> <span> scholarship</span>
              </li>
            )}
          </ul>
          {coursesTaught && (
            <div className="text-lg mt-5 flex gap-3">
              {coursesTaught.map(course => (
                <div
                  className="badge badge-neutral p-4 text-lg font-semibold"
                  key={course}
                >
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonProfile;

import React from "react";

import IconsBox from "./IconsBox";
import { useStudents } from "../contexts/StudentsContext";
import SchoolIcon from "@mui/icons-material/School";
import Tooltip from "@mui/material/Tooltip";

const AVATAR_BASE_URL = "https://i.pravatar.cc/300?u=";

const CourseListRow = ({ person }) => {
  const { photo, firstName, lastName, id, courses } = person;

  const { dispatch, profiledPersonId } = useStudents();
  const toggleProfileIdHandler = () => {
    if (id === profiledPersonId) dispatch({ type: "UNSET_PROFILED_ID" });
    else dispatch({ type: "SET_PROFILED_ID", payload: id });
  };

  return (
    <div className="p-4 border-none rounded-xl flex items-center gap-10 mb-5 w-auto">
      <IconsBox id={id} />
      <div className="avatar">
        <div className="mask mask-squircle w-24 h-24">
          <img
            className="cursor-pointer"
            src={`${AVATAR_BASE_URL}${photo}`}
            alt="personal photo"
            onClick={toggleProfileIdHandler}
          />
        </div>
      </div>
      <div
        className={`text-xl flex items-center gap-3 ${
          courses ? "font-bold" : null
        }`}
      >
        {`${firstName} ${lastName}`}{" "}
        {courses ? (
          <Tooltip title="tutor">
            <SchoolIcon />
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};

export default CourseListRow;

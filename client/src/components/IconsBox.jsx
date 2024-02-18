import React from "react";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

import { useStudents } from "../contexts/StudentsContext";

const IconsBox = ({ id }) => {
  const { dispatch, profiledPersonId, toggleStudentToRemoveId } = useStudents();

  const isStudent = id.toString().slice(0, 2) === "15";

  const setProfileIdHandler = () =>
    dispatch({ type: "SET_PROFILED_ID", payload: id });
  const setRemoveIdHandler = () => toggleStudentToRemoveId(id);

  return (
    <div className="flex gap-3">
      <Tooltip
        title="Remove student"
        className={`cursor-pointer ${isStudent ? null : "invisible"}`}
      >
        <PersonRemoveIcon onClick={setRemoveIdHandler} />
      </Tooltip>
      <Tooltip
        title="View details"
        className={
          profiledPersonId === id
            ? "invisible cursor-pointer"
            : "cursor-pointer"
        }
      >
        <VisibilityIcon onClick={setProfileIdHandler} />
      </Tooltip>
    </div>
  );
};

export default IconsBox;

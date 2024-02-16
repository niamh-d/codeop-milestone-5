import React from "react";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

import { useStudents } from "../contexts/StudentsContext";

const IconsBox = ({ id }) => {
  const { dispatch } = useStudents();

  const setProfileIdHandler = () =>
    dispatch({ type: "SET_PROFILED_ID", payload: id });
  const setDeleteIdHandler = () =>
    dispatch({ type: "SET_DELETE_ID", payload: id });

  return (
    <div className="flex gap-3">
      <Tooltip title="Remove student">
        <PersonRemoveIcon onClick={setDeleteIdHandler} />
      </Tooltip>
      <Tooltip title="View details">
        <VisibilityIcon onClick={setProfileIdHandler} />
      </Tooltip>
    </div>
  );
};

export default IconsBox;

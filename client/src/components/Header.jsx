import React from "react";

import TableViewIcon from "@mui/icons-material/TableView";
import Tooltip from "@mui/material/Tooltip";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useStudents } from "../contexts/StudentsContext";

const Header = () => {
  const { dispatch, activeView, showForm } = useStudents();

  const toggleViewRender = () => {
    dispatch({ type: "TOGGLE_VIEW" });
  };

  const toggleShowFormHandler = () => dispatch({ type: "TOGGLE_SHOW_FORM" });

  return (
    <header className="flex gap-10 items-center mb-10">
      <h1>
        Student Records/{activeView === "courses-list" ? "Courses" : "Table"}
      </h1>
      {activeView === "courses-list" && (
        <Tooltip title="Switch to table view">
          <TableViewIcon
            onClick={toggleViewRender}
            className="cursor-pointer"
          />
        </Tooltip>
      )}
      {activeView === "table-view" && (
        <Tooltip title="Switch to course lists">
          <PeopleAltIcon
            onClick={toggleViewRender}
            className="cursor-pointer"
          />
        </Tooltip>
      )}
      {activeView === "courses-list" && (
        <button
          className={`btn ${showForm ? "btn-disabled" : "btn-secondary"}`}
          onClick={toggleShowFormHandler}
        >
          <PersonAddIcon /> Add new student
        </button>
      )}
    </header>
  );
};

export default Header;

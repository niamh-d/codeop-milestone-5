import React from "react";

import { useStudents } from "../../contexts/StudentsContext";
import Table from "../Table";

const TableView = () => {
  const { studentsArr } = useStudents();

  return (
    <div>
      <Table students={studentsArr} />
    </div>
  );
};

export default TableView;

import React from "react";

import { useStudents } from "../contexts/StudentsContext";

const DeleteModal = () => {
  const { toggleStudentToRemoveId, removeStudent } = useStudents();

  const unsetRemoveIdHandler = () => toggleStudentToRemoveId();
  const removeStudentHandler = () => removeStudent();

  return (
    <dialog id="modal_delete" className="modal">
      <div className="modal-box bg-error">
        <h3 className="font-bold text-2xl">
          Are you sure you want to remove this student?
        </h3>
        <p className="py-4 text-xl">
          This is a destructive action and cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-ghost text-sm mr-3 btn-sm"
              onClick={removeStudentHandler}
            >
              Remove Student
            </button>
            <button
              className="btn btn-secondary text-lg"
              onClick={unsetRemoveIdHandler}
            >
              Close me
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;

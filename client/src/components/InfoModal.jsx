import React from "react";

const InfoModal = ({ student, type, dispatch }) => {
  if (!student) return;

  const { firstName, lastName, stringId } = student;

  const resetHandler = () => dispatch({ type: "RESET" });

  return (
    <dialog id={`modal-info_${type}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Actioned!</h3>
        <p className="py-4 text-xl">
          Student{" "}
          <span className="font-bold">
            {firstName} {lastName}
          </span>{" "}
          with ID number{" "}
          {`${stringId} has been
          ${type === "add" ? "added to" : "removed from"} the database.`}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-secondary text-lg"
              onClick={resetHandler}
            >
              Okay
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default InfoModal;

import React from "react";

import IconsBox from "./IconsBox";

const AVATAR_BASE_URL = "https://i.pravatar.cc/300?u=";

const Student = ({ student }) => {
  const { photo, firstName, lastName, id } = student;
  return (
    <div className="flex items-center gap-10 mb-5">
      <IconsBox id={id} />
      <div className="avatar">
        <div className="mask mask-squircle w-24 h-24">
          <img src={`${AVATAR_BASE_URL}${photo}`} alt="studnet photo" />
        </div>
      </div>
      <div className="text-xl">{`${firstName} ${lastName}`}</div>
    </div>
  );
};

export default Student;

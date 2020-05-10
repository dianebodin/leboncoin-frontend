import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Instruction = ({ title_ins, description_ins, icon_ins }) => {
  return (
    <div className="instruction-container">
      <FontAwesomeIcon className="instruction-icon fa-fw" icon={icon_ins} />
      <div>
        <p>{title_ins}</p>
        <p>{description_ins}</p>
      </div>
    </div>
  );
}

export default Instruction;
import React from "react";
import { Button } from "react-bootstrap";

import { CustomButtonProps } from "../../utuils/interfaces";

/**
 * A customizable button component using React-Bootstrap.
 *
 * @param {CustomButtonProps} props - Component properties.
 * @returns {JSX.Element} The rendered button component.
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  onClick,
  label,
}): JSX.Element => {
  return (
    <div className="d-grid gap-2">
      <Button variant={type || "dark"} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;

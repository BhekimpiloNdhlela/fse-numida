import React from "react";
import { Button } from "react-bootstrap";

// Define the props interface
interface CustomButtonProps {
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  onClick: () => void;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  onClick,
  label,
}) => {
  return (
    <div className="d-grid gap-2">
      <Button variant={type} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;

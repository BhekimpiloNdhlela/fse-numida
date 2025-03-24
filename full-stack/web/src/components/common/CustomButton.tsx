import React from "react";
import { Button } from "react-bootstrap";

/**
 * Defines the available button types.
 */
type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

/**
 * Props for the CustomButton component.
 */
interface CustomButtonProps {
  /** The type of button variant to use. */
  type: ButtonVariant;
  /** Function to handle button clicks. */
  onClick: () => void;
  /** The label text displayed on the button. */
  label: string;
}

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

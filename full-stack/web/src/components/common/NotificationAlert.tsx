import React from "react";
import Alert from "react-bootstrap/Alert";

// Define the type for the variant prop
type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface NotificationAlertProps {
  type: AlertVariant;
  message?: string;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  type,
  message,
}) => {
  return <Alert variant={type}>{message}</Alert>;
};

export default NotificationAlert;

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

/**
 * @typedef {("primary" | "secondary" | "success" | "danger" | "warning" | "info")} AlertVariant
 *
 * @typedef {Object} NotificationAlertProps
 * @property {AlertVariant} type - The type of alert to display.
 * @property {string} [message] - The message to display inside the alert.
 */

/**
 * NotificationAlert component for displaying Bootstrap-styled alerts.
 *
 * @param {NotificationAlertProps} props - Component properties.
 * @returns {JSX.Element} The rendered alert component.
 */
const NotificationAlert: React.FC<NotificationAlertProps> = ({
  type,
  message,
}) => {
  return <Alert variant={type}>{message}</Alert>;
};

export default NotificationAlert;

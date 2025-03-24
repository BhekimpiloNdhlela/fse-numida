import React from "react";
import Alert from "react-bootstrap/Alert";

import { NotificationAlertProps } from "../../utuils/interfaces";

/**
 * NotificationAlert component for displaying Bootstrap-styled alerts.
 *
 * @param {NotificationAlertProps} props - Component properties.
 * @returns {JSX.Element} The rendered alert component.
 */
const NotificationAlert: React.FC<NotificationAlertProps> = ({
  type,
  message,
}): JSX.Element => {
  return <Alert variant={type}>{message}</Alert>;
};

export default NotificationAlert;

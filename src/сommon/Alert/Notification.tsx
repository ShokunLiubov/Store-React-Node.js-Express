import React from "react";
import styles from "./Notification.module.scss";

interface INotificationProps {}

export const Notification: React.FC<INotificationProps> = () => {
  return (
    <div className={styles.Notification}>
      <span>Error</span>
      This is an error alert — <strong>check it out!</strong>
    </div>
  );
};

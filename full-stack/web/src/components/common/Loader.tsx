import React from "react";
import { ClockLoader } from "react-spinners";

import { LoaderProps } from "../../utuils/interfaces";

/**
 * A full-screen loading spinner component using react-spinners.
 *
 * @param {LoaderProps} props - Component properties.
 * @returns {JSX.Element} The rendered loader component.
 */
const Loader: React.FC<LoaderProps> = ({ loading }): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        fontSize: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <ClockLoader
        size={200}
        color="gray"
        loading={loading}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;

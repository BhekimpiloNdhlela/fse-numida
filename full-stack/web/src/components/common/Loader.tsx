import React from "react";
import { ClockLoader } from "react-spinners";

const Loader: React.FC<LoaderProps> = ({ loading }) => {
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
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <ClockLoader
        size={200}
        color="#123abc"
        loading={loading}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;

interface LoaderProps {
  loading: boolean;
}

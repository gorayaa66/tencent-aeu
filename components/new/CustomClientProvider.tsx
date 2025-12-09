"use client";
import dynamic from "next/dynamic";
import React from "react";
const LivePlayer = dynamic(() => import("./CustomLiveLayout"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading...
    </div>
  ),
});

const CustomClientProvider = () => {
  return (
    <div>
      <LivePlayer />
    </div>
  );
};

export default CustomClientProvider;

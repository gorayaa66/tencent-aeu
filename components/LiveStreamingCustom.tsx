"use client";
import dynamic from "next/dynamic";
import React from "react";
const LivePlayer = dynamic(() => import("./LivePage/LivePage"), {
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

const LiveStreamingCustom = () => {
  return (
    <div>
      <div className="">
        <LivePlayer />
      </div>
    </div>
  );
};

export default LiveStreamingCustom;

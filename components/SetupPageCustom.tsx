"use client";
import dynamic from "next/dynamic";
import React from "react";
const SetupPage = dynamic(() => import("./SetupPage/setup-page"), {
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

const SetupCustomPage = () => {
  return (
    <div>
      <div className="">
        <SetupPage />
      </div>
    </div>
  );
};

export default SetupCustomPage;

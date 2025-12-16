"use client";

import React from "react";
import useSetupStream from "@/hooks/useSetupStream";
import { LoginStatus, useLiveListState } from "tuikit-atomicx-react";

const StreamSetupPage = () => {
  const { currentLive } = useLiveListState();
  const {
    form,
    update,
    handleStart,
    handleCamera,
    handleMicrophone,
    handleScreen,
    isCameraOpen,
    setIsCameraOpen,
    isUnmuteMicroPhone,
    setIsUnmuteMicroPhone,
    isSharingScreen,
    setIsSharingScreen,
    handleLogin,
    status,
    handleEndLive,
    isEnding,
    isStarting,
  } = useSetupStream();

  console.log("current live : ", currentLive);

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Stream Setup</h1>

      {/* ===== LOGIN ===== */}
      <button onClick={handleLogin}>
        {status === LoginStatus.SUCCESS
          ? "Logged In"
          : status === LoginStatus.LOADING
          ? "Loading..."
          : "Login"}
      </button>

      {/* ===== LIVE FORM ===== */}
      <form onSubmit={handleStart} style={{ marginTop: 20 }}>
        <div style={{ display: "grid", gap: 12 }}>
          <input
            placeholder="Live ID"
            value={form.liveId}
            onChange={(e) => update("liveId", e.target.value)}
            required
          />

          <input
            placeholder="Live Name"
            value={form.liveName}
            onChange={(e) => update("liveName", e.target.value)}
            required
          />

          <textarea
            placeholder="Notice"
            value={form.notice}
            onChange={(e) => update("notice", e.target.value)}
          />

          <input
            placeholder="Cover URL"
            value={form.coverUrl}
            onChange={(e) => update("coverUrl", e.target.value)}
          />

          <input
            placeholder="Background URL"
            value={form.backgroundUrl}
            onChange={(e) => update("backgroundUrl", e.target.value)}
          />
        </div>

        {/* ===== TOGGLES ===== */}
        <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
          <label>
            <input
              type="checkbox"
              checked={form.isPublicVisible}
              onChange={(e) => update("isPublicVisible", e.target.checked)}
            />{" "}
            Public Visible
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.isSeatEnabled}
              onChange={(e) => update("isSeatEnabled", e.target.checked)}
            />{" "}
            Seat Enabled
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.isGiftEnabled}
              onChange={(e) => update("isGiftEnabled", e.target.checked)}
            />{" "}
            Gift Enabled
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.isLikeEnabled}
              onChange={(e) => update("isLikeEnabled", e.target.checked)}
            />{" "}
            Like Enabled
          </label>
        </div>
        {currentLive?.liveId ? (
          <button
            type="button"
            style={{
              marginTop: 20,
              padding: "10px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={handleEndLive}
          >
            {isEnding ? "Ending Live...." : "End Live"}
          </button>
        ) : (
          <button
            type="submit"
            style={{
              marginTop: 20,
              padding: "10px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isStarting ? "Starting Live...." : "Start Live"}
          </button>
        )}
      </form>

      {/* ===== STREAM CONTROLS ===== */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Stream Controls</h2>

        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button
            onClick={() => {
              const next = !isCameraOpen;
              setIsCameraOpen(next);
              handleCamera(next);
            }}
          >
            {isCameraOpen ? "Close Camera" : "Open Camera"}
          </button>

          <button
            onClick={() => {
              const next = !isUnmuteMicroPhone;
              setIsUnmuteMicroPhone(next);
              handleMicrophone(next);
            }}
          >
            {isUnmuteMicroPhone ? "Mute Mic" : "Unmute Mic"}
          </button>

          <button
            onClick={() => {
              const next = !isSharingScreen;
              setIsSharingScreen(next);
              handleScreen(next);
            }}
          >
            {isSharingScreen ? "Stop Screen" : "Share Screen"}
          </button>
        </div>
      </div>

      {/* ===== VIDEO PREVIEWS ===== */}
      <div style={{ marginTop: 30, display: "grid", gap: 16 }}>
        <div
          id="preview-camera"
          style={{
            width: 320,
            height: 180,
            background: "#000",
          }}
        />

        <div
          id="screen-preview"
          style={{
            width: 320,
            height: 180,
            background: "#111",
          }}
        />
      </div>
    </div>
  );
};

export default StreamSetupPage;

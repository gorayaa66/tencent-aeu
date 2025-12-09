"use client";
import React from "react";
import { LiveView, useLiveListState } from "tuikit-atomicx-react";
import { useAutoJoinLive } from "@/hooks/useAutoJoinLive";

const CustomLiveView = () => {
  const { currentLive } = useLiveListState();
  const { isLoggingIn, isJoining, hasJoined, error, liveId, userId } =
    useAutoJoinLive();

  const showLive = Boolean(currentLive?.liveId);

  return (
    <div className="h-full flex justify-center flex-col gap-4 items-center">
      {/* Loading UI */}
      {isLoggingIn && <div>Logging in user: {userId}...</div>}
      {isJoining && <div>Joining live room: {liveId}...</div>}

      {/* Error Handling */}
      {error && <div className="text-red-500">{error}</div>}

      {/* After Join */}
      {hasJoined && showLive && <LiveView />}

      {/* No Live */}
      {!isJoining && !showLive && <div>No Live Streaming Available.</div>}
    </div>
  );
};

export default CustomLiveView;

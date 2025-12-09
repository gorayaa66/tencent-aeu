"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useLiveListState,
  useLoginState,
  LoginStatus,
} from "tuikit-atomicx-react";
import { genTestUserSig } from "@/debug";
import { SDK_ID, SECRET_KEY } from "@/constants";

export const useAutoJoinLive = () => {
  const searchParams = useSearchParams();

  const { status, login } = useLoginState();
  const { joinLive } = useLiveListState();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const liveId = searchParams.get("liveId");
  const userId = searchParams.get("userId");

  const handleLogin = async () => {
    try {
      const userInfo = genTestUserSig({
        userID: userId,
        SDKAppID: SDK_ID,
        secretKey: SECRET_KEY,
      });

      // Execute chat login
      await login({
        SDKAppID: userInfo.SDKAppID,
        userID: userInfo.userID,
        userSig: userInfo.userSig,
      });
    } catch (error) {
      console.error("[AutoJoin] Failed to login:", error);
    }
  };

  useEffect(() => {
    if (!liveId || !userId) return;

    const autoJoin = async () => {
      try {
        setError(null);

        /** 1. Login if needed */
        if (status !== LoginStatus.SUCCESS) {
          setIsLoggingIn(true);
          await handleLogin();
          setIsLoggingIn(false);
        }

        /** 2. Join the live */
        setIsJoining(true);

        await joinLive({ liveId });
        setHasJoined(true);

        console.log("[AutoJoin] Joined Live:", liveId);
      } catch (err: any) {
        console.error("[AutoJoin] Failed:", err);
        setError(err?.message || "Failed to join live");
      } finally {
        setIsJoining(false);
      }
    };

    autoJoin();
  }, [liveId, userId, status, joinLive]);

  return {
    liveId,
    userId,
    isLoggingIn,
    isJoining,
    hasJoined,
    error,
  };
};

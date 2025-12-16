"use client";
import React, { useState } from "react";
import {
  LoginStatus,
  TUIVideoStreamType,
  useLiveListState,
  useLoginState,
  useRoomEngine,
} from "tuikit-atomicx-react";
import { genTestUserSig } from "@/debug";
import { SDK_ID, SECRET_KEY } from "@/constants";
const useSetupStream = () => {
  const { createLive, endLive } = useLiveListState();
  const roomEngine = useRoomEngine();
  const [isUnmuteMicroPhone, setIsUnmuteMicroPhone] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const { status, login } = useLoginState();
  const [isEnding, setIsEnding] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const [form, setForm] = useState({
    liveId: "",
    liveName: "",
    notice: "",
    isMessageDisableForAllUser: false,
    isGiftEnabled: false,
    isLikeEnabled: true,
    isPublicVisible: true,
    isSeatEnabled: true,
    layoutTemplate: 600,
    keepOwnerOnSeat: true,
    // seatLayoutTemplateId: 1,
    maxSeatCount: 4,
    // seatMode: "free",
    coverUrl: "",
    backgroundUrl: "",
    categoryList: [],
    activityStatus: 1,
    seatMode: "FreeToTake",
  });

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const userId = "alex_hales";

  const handleLogin = async () => {
    try {
      // TODO: MOVE INTO SERVER SIDE
      // ! ONLY FOR TESTING FOR TESTING
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

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Live:", form);
    if (status !== LoginStatus.SUCCESS) {
      alert("Please login first");
      return;
    }

    try {
      if (!roomEngine.instance) {
        alert("RoomEngine is not initialized");
        return;
      }
      setIsStarting(true);
      await createLive(form as any);
      alert("Live created successfully");
    } catch (error) {
      console.error("Error creating live:", error);
      alert("Error creating live");
    } finally {
      setIsStarting(false);
    }
  };

  const handleEndLive = async () => {
    try {
      setIsEnding(true);
      await endLive();
    } catch (error) {
      console.error("Error ending live:", error);
      alert("Error ending live");
    } finally {
      setIsEnding(false);
    }
  };

  const handleCamera = async (isOpen: boolean) => {
    try {
      const instance = roomEngine.instance;
      if (!instance) {
        alert("RoomEngine is not initialized");
        return;
      }
      if (isOpen) {
        instance.setLocalVideoView({
          streamType: TUIVideoStreamType.K_CAMERA_STREAM as any,
          view: "preview-camera",
        });
        await instance.openLocalCamera();
      } else {
        await instance.closeLocalCamera();
      }
      alert("Camera updated successfully");
    } catch (error) {
      alert("Error updating Camera");
      console.error("Error updating Camera:", error);
    }
  };

  const handleMicrophone = async (isOpen: boolean) => {
    console.log("Handle Microphone : ", isOpen);
    try {
      const instance = roomEngine.instance;
      if (!instance) {
        alert("RoomEngine is not initialized");
        return;
      }

      if (isOpen) {
        await instance.openLocalMicrophone();
      } else {
        await instance.closeLocalMicrophone();
      }
      alert("Microphone updated successfully");
    } catch (error) {
      alert("Error updating Microphone");
      console.error("Error updating Microphone:", error);
    }
  };

  const handleScreen = async (isOpen: boolean) => {
    try {
      const instance = roomEngine.instance;
      if (!instance) {
        alert("RoomEngine is not initialized");
        return;
      }
      if (isOpen) {
        await instance.startScreenSharing({ view: "screen-preview" });
      } else {
        await instance.stopScreenSharing();
      }
      alert("Screen updated successfully");
    } catch (error) {
      alert("Error updating Screen");
      console.error("Error updating screen:", error);
    }
  };
  return {
    isUnmuteMicroPhone,
    setIsUnmuteMicroPhone,
    isCameraOpen,
    setIsCameraOpen,
    isSharingScreen,
    setIsSharingScreen,
    form,
    setForm,
    update,
    handleEndLive,
    handleStart,
    handleCamera,
    handleMicrophone,
    handleScreen,
    handleLogin,
    status,
    isStarting,
    isEnding,
  };
};

export default useSetupStream;

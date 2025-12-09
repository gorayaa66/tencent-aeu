"use client";
import React from "react";
import { LiveView, useLiveListState } from "tuikit-atomicx-react";
import { useAutoJoinLive } from "@/hooks/useAutoJoinLive";
import Image from "next/image";
import profile from "@/public/profile.png";
const CustomLiveView = () => {
  const { currentLive } = useLiveListState();
  const { isLoggingIn, isJoining, hasJoined, error, liveId, userId } =
    useAutoJoinLive();

  const showLive = Boolean(currentLive?.liveId);
  const totalViewers = currentLive?.currentViewerCount;

  return (
    <div className="h-full flex justify-center flex-col gap-4 items-center relative">
      {/* TOP OVERLAY */}
      <div className="absolute top-0 left-0 w-full z-[111] flex justify-between  p-4">
        {/* LEFT */}
        <div className="flex items-start gap-2">
          <Image
            src={profile}
            alt="host image"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col bg-black/15">
            <h3 className="text-base text-white font-semibold">
              Pakistan Super League, Lahore
            </h3>
            <p className="text-sm text-white">By John Doe</p>
          </div>
        </div>
        {/* Right */}
        <div className="flex gap-2 items-start">
          <p className="bg-red-500 text-white uppercase text-sm px-2 py-1 rounded-lg">
            Live
          </p>
          <div className="flex gap-1 items-center bg-black/20  rounded-full px-4 py-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18747 8C6.18747 8.46413 6.37184 8.90925 6.70003 9.23744C7.02822 9.56562 7.47334 9.75 7.93747 9.75C8.4016 9.75 8.84672 9.56562 9.1749 9.23744C9.50309 8.90925 9.68747 8.46413 9.68747 8C9.68747 7.53587 9.50309 7.09075 9.1749 6.76256C8.84672 6.43437 8.4016 6.25 7.93747 6.25C7.47334 6.25 7.02822 6.43437 6.70003 6.76256C6.37184 7.09075 6.18747 7.53587 6.18747 8ZM14.7218 7.59687C13.2406 4.47656 11.0015 2.90625 7.99997 2.90625C4.99684 2.90625 2.75934 4.47656 1.27809 7.59844C1.21868 7.72424 1.18787 7.86165 1.18787 8.00078C1.18787 8.13991 1.21868 8.27732 1.27809 8.40312C2.75934 11.5234 4.99841 13.0937 7.99997 13.0937C11.0031 13.0937 13.2406 11.5234 14.7218 8.40156C14.8422 8.14844 14.8422 7.85469 14.7218 7.59687ZM7.93747 10.75C6.41872 10.75 5.18747 9.51875 5.18747 8C5.18747 6.48125 6.41872 5.25 7.93747 5.25C9.45622 5.25 10.6875 6.48125 10.6875 8C10.6875 9.51875 9.45622 10.75 7.93747 10.75Z"
                fill="#E0E0E0"
              />
            </svg>
            <p>{totalViewers}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-black/20 rounded-md p-1">
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2439 3.70732C9.59817 2.47154 7.62869 0 4.91662 0C1.52654 0 -0.410654 3.70732 0.0736436 6.17886C0.557942 8.65041 2.01082 11.7398 4.91662 13.5935C6.69238 14.6233 10.0435 16.6829 10.2439 19C10.5 16.6829 14.6087 14.8293 15.8375 13.5935C18.8886 11.7398 20.4142 8.65041 20.9227 6.17886C21.4312 3.70732 19.3971 0 15.8375 0C12.9899 0 10.9219 2.47154 10.2439 3.70732Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="bg-black/20 rounded-md p-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.54545 4.54545L9.09091 10L7.72727 11.3636H9.54545L14.0909 14.5455V14.0909L10.9091 10.4545L10 4.54545H9.54545Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM18.1818 10C18.1818 14.5187 14.5187 18.1818 10 18.1818C5.48131 18.1818 1.81818 14.5187 1.81818 10C1.81818 5.48131 5.48131 1.81818 10 1.81818C14.5187 1.81818 18.1818 5.48131 18.1818 10Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="bg-black/20 rounded-md p-1">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 13L6 16L18 5L7 17V20.5L9 18L15.5 22L21 0L0 13Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM OVERLAY */}
      <div className="absolute bottom-0  right-0 w-full z-[111] flex justify-end  p-4">
        Powered by AEU
      </div>
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

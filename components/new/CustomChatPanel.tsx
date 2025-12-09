import Image from "next/image";
import React, { useState } from "react";
import {
  BarrageList,
  useBarrageState,
  useLiveListState,
} from "tuikit-atomicx-react";
import avatar1 from "@/public/avatar1.png";
import avatar2 from "@/public/avatar2.png";

const CustomChatPanel = () => {
  const { currentLive } = useLiveListState();
  const { sendTextMessage } = useBarrageState();
  const isLive = Boolean(currentLive?.liveId);
  const [message, setMessage] = useState("");

  const handleSendTextMessge = async () => {
    try {
      const result = await sendTextMessage({
        text: message,
      });
      setMessage("");
      console.log("message send successfully...", result);
    } catch (error) {
      console.warn("Error while sending Message : ", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {isLive ? (
          <BarrageList
            height="100%"
            style={{
              backgroundColor: "transparent",
              height: "100%",
              color: "white",
            }}
            Message={({ message }) => {
              console.log("message : ", message);
              const isOwnerMessge =
                message?.sender?.userId === currentLive?.liveOwner.userId;
              return (
                <CommentItem
                  avatar={
                    message?.sender?.avatarUrl || isOwnerMessge
                      ? avatar1
                      : avatar2
                  }
                  name={message.sender.userName || message.sender.userId}
                  color={isOwnerMessge ? "#5ED36A" : "#3D9BB7"}
                  message={message.textContent}
                  isOwnerMessage={isOwnerMessge}
                />
              );
            }}
          />
        ) : (
          <div>Join Live In order to chat.</div>
        )}
      </div>
      <div>
        <input
          type="text"
          className="border border-white bg-transparent mt-5 w-full outline-none px-4 py-3 rounded-[18px]"
          placeholder="Say something..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim() !== "") {
              console.log("Message sent:", message);
              handleSendTextMessge();
            }
          }}
        />
      </div>
      {/* Bullet Comments Overlay */}
      {/* <BulletCommentOverlay newMessage={latestChatMessage} /> */}
    </div>
  );
};

export default CustomChatPanel;

const CommentItem = ({ avatar, name, color, message, isOwnerMessage }: any) => (
  <div className="flex gap-2 items-center mt-4">
    <div className="bg-[#3D9BB7] rounded-[14px] w-10 h-10 min-w-10 overflow-hidden">
      <Image
        src={avatar}
        alt={`${name} avatar`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-nowrap text-sm" style={{ color }}>
        {name}
      </p>
    </div>
    <p className="text-xs text-[#BDBDBD]">{message}</p>
  </div>
);

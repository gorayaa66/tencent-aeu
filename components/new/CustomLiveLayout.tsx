import React, { useState } from "react";
import CustomLiveView from "./CustomLiveView";
import CustomChatPanel from "./CustomChatPanel";
import CustomAudiencePanel from "./CustomAudiencePanel";

const CustomLiveLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"chat" | "audience">(
    "chat"
  );
  return (
    <div>
      <main className="flex flex-row w-full h-screen">
        {/* Main Live View */}
        <div className="w-full flex-1">
          <CustomLiveView />
        </div>
        {/* Left Sidebar */}
        <aside className="w-[340px]  px-4 py-4 bg-[#111827]">
          <div className="h-full">
            {selectedOption === "chat" ? (
              <CustomChatPanel />
            ) : (
              <CustomAudiencePanel />
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CustomLiveLayout;

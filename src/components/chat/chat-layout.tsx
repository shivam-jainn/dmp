"use client";

import React, { useEffect, useState } from "react";
import { userData } from "./data";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";

interface ChatLayoutProps {
}

export function ChatLayout() {
  
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

 
  return (
    <section
      className="h-full items-stretch"
    >

        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
    </section>
  );
}

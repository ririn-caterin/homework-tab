"use client";

import { MouseEventHandler, ReactNode, useState } from "react";
import Image from "next/image";

type TabButtonProps = {
  isActive: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 m-4 bg-neutral-900 text-white rounded-xl w-full text-center ${
        isActive ? "outline outline-2 outline-[goldenrod] outline-offset-4" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-col max-w-[720px] w-full">
        <div className="flex">
          <TabButton
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </TabButton>
          <TabButton
            isActive={activeTab === "about-me"}
            onClick={() => setActiveTab("about-me")}
          >
            About Me
          </TabButton>
        </div>
        <div>
          {activeTab === "profile" ? (
            <div className="m-4">
              <h1>Profile</h1>
              <p>The page your profile page</p>
              <div className="my-8">
                <Image
                  src="https://pbs.twimg.com/profile_images/1434881675255861248/Grx8VDTK_400x400.jpg"
                  alt="Image Profile"
                  width={240}
                  height={240}
                  className="outline outline-black outline-offset-2 outline-2 rounded-2xl"
                />
                <h2 className="mt-3">Uncle Roger</h2>
              </div>
            </div>
          ) : (
            <div className="m-4">
              <h1>About Me</h1>
              <p className="mt-2">This page is telling about your self</p>
              <div className="my-8">
                <h2>Uncle Roger</h2>
                <p className="mt-3 leading-loose">
                  Nigel Ng Kin-ju[a] (/ʌŋ/ UNG; born 1990/1991) is a Malaysian
                  comedian and YouTuber. He is best known for co-creating
                  (alongside Evelyn Mok) and portraying Uncle Roger, a character
                  representing a middle-aged Asian uncle with an exaggerated
                  Cantonese accent who is usually seen aggressively critiquing
                  peoples attempts at cooking Asian food.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

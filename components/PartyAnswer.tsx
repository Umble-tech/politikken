import * as React from "react";
import tailwindConfig from "../tailwind.config.js";
import { parties } from "../parties.js";

interface PartyAnswerProps {
  party: string;
  text: string;
}

export const PartyAnswer: React.FC<PartyAnswerProps> = ({ party, text }) => {
  const color = tailwindConfig.theme?.extend?.colors?.party[party];

  return (
    <div className={`rounded p-4 bg-gray-200 ${!text ? "opacity-50" : ""}`}>
      <div className="flex gap-2 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: color }}
        />
        <h1 className={`text-xl font-bold`}>{parties[party]}</h1>
      </div>
      <p>{text}</p>
    </div>
  );
};

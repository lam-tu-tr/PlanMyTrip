import React from "react";
import { FiArrowUpCircle } from "react-icons/fi";

import "./AiChatBox.scss";

type AiChatBoxType = {
  userMessage: string;
  aiComplete: boolean;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function AiChatBox({
  userMessage,
  aiComplete,
  setUserMessage,
}: AiChatBoxType) {
  return (
    <aside id="adjustment">
      <textarea
        name="userMessage"
        placeholder="Replace museum with..."
        value={userMessage}
        disabled={!aiComplete}
        onChange={({ target }) => setUserMessage(target.value)}
      />
      {aiComplete ? (
        <button title="Submit adjustments" type="submit">
          <FiArrowUpCircle className="w-8 h-8" />
        </button>
      ) : (
        <div className="spinner"></div>
      )}
    </aside>
  );
}

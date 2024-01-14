import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { formatPeerId } from "../../utils/lobby";

const LobbyUI = ({
  peerId,
  friendPeerId,
  setFriendPeerId,
  handleConnectToPeer,
  error,
}) => (
  <div className="relative flex flex-col items-center justify-center">
    {/* User's Peer ID Display */}
    <div className="flex items-center p-2 m-2 text-white bg-gray-400 rounded-lg">
      <p className="flex-grow">Your ID: {formatPeerId(peerId)}</p>
      <button
        className="ml-2 hover:text-black"
        onClick={() => navigator.clipboard.writeText(peerId)}
        aria-label="Copy peer ID"
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>

    {/* Input for Friend's Peer ID */}
    <input
      type="text"
      value={friendPeerId}
      onChange={(e) => setFriendPeerId(e.target.value)}
      placeholder="Enter Peer ID"
      className="w-full max-w-xs p-2 m-2 border-2 border-black rounded-lg"
      aria-label="Enter friend's peer ID"
    />

    {/* Connect Button */}
    <button
      onClick={handleConnectToPeer}
      className="p-2 m-2 text-white bg-green-400 rounded-lg hover:bg-green-600"
    >
      Connect
    </button>

    {/* Error Message */}
    {error && (
      <div className="absolute transform w-72 top-44 ">
        <p className="p-2 text-white bg-red-500 rounded-lg">
          ⚠️ Error: {error}
        </p>
      </div>
    )}
  </div>
);

export default LobbyUI;

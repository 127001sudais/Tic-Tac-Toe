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
  <div className="flex flex-col justify-center items-center">
    <div className="flex bg-gray-400 p-2 m-2 rounded-lg text-white">
      <p className="flex-1">Your ID: {formatPeerId(peerId)}</p>
      <button
        className="pl-2 hover:text-black"
        onClick={() => navigator.clipboard.writeText(peerId)}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>

    <input
      className="border-2 rounded-lg p-2 m-2 border-black"
      type="text"
      value={friendPeerId}
      onChange={(e) => setFriendPeerId(e.target.value)}
      placeholder="Friend's Peer ID"
    />

    <button
      className="bg-green-400 hover:bg-green-600 p-2 m-2 rounded-lg text-white"
      onClick={handleConnectToPeer}
    >
      Connect
    </button>

    {error && (
      <p className="bg-red-500 p-2 m-2 rounded-lg text-white">
        ⚠️⚠️💀💀 {error}
      </p>
    )}
  </div>
);

export default LobbyUI;

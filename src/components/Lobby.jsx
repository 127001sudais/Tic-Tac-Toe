import React, { useEffect, useState } from "react";
import { getFriendlyErrorMessage } from "../utils/peerConnection";
import {
  initializePeer,
  connectToPeer,
  closePeerConnection,
} from "../utils/peerConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const Lobby = () => {
  const [peerId, setPeerId] = useState("");
  const [friendPeerId, setFriendPeerId] = useState("");
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  useEffect(() => {
    const peerInstance = initializePeer(
      (id) => {
        setPeerId(id);
      },
      (conn) => {
        console.log("Incoming connection", conn);
        setConnectionStatus(`Connected to ${conn.peer}`);
      },
      (err) => {
        console.error("Peer error", err);
        setError(err.message);
      }
    );

    return () => {
      closePeerConnection();
    };
  }, []);

  const handleConnectToPeer = () => {
    setError(""); // Clear previous errors

    if (!friendPeerId) {
      setError("Please enter your friend's peer ID.");
      return;
    }

    const connection = connectToPeer(
      friendPeerId,
      (conn) => {
        setConnectionStatus(`Connected to ${conn.peer}`);
      },
      (err) => {
        // Use the getFriendlyErrorMessage function to set a user-friendly error message
        setError(getFriendlyErrorMessage(err));
      }
    );

    if (connection) {
      connection.on("data", (data) => {
        // Handle received data
        console.log("Received", data);
      });

      connection.on("close", () => {
        setError("The peer has disconnected.");
        setConnectionStatus("");
      });

      connection.on("error", (err) => {
        setError("An error occurred during the connection.");
        console.error(err);
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex bg-gray-400 p-2 m-2 rounded-lg text-white">
        <p className="flex-1">Your ID:{peerId}</p>
        <button
          className="pl-2 hover:text-black"
          onClick={() => navigator.clipboard.writeText(peerId)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>

      <input
        className=" border-2 rounded-lg p-2 m-2 border-black"
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
          Error: {error}
        </p>
      )}

      <p className="bg-cyan-300 p-2 m-2 rounded-lg text-white">
        {connectionStatus}
      </p>
    </div>
  );
};

export default Lobby;

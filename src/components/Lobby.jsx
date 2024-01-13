import React, { useEffect, useState } from "react";
import Multiplayer from "./Multiplayer";
import {
  initializePeer,
  connectToPeer,
  closePeerConnection,
  getFriendlyErrorMessage,
} from "../utils/peerConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const Lobby = () => {
  const [peerId, setPeerId] = useState("");
  const [friendPeerId, setFriendPeerId] = useState("");
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");
  const [inGame, setInGame] = useState(false);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    const peerInstance = initializePeer(
      (id) => setPeerId(id),
      (conn) => {
        console.log("Incoming connection", conn);
        setConnectionStatus(`Connected to ${conn.peer}`);
        setInGame(true); // This line is added to transition the receiving user into the game
        setConn(conn);
        conn.on("data", (data) => {
          // Handle the received data to update the game state
        });
      },
      (err) => {
        console.error("Peer error", err);
        setError(getFriendlyErrorMessage(err));
      }
    );

    return () => closePeerConnection();
  }, []);

  const handleConnectToPeer = () => {
    setError("");

    const connection = connectToPeer(
      friendPeerId,
      (conn) => {
        setConnectionStatus(`Connected to ${conn.peer}`);
        console.log("Connected to peer:", conn.peer);
        setInGame(true);
        setConn(connection);
      },
      (err) => setError(getFriendlyErrorMessage(err))
    );

    if (connection) {
      connection
        .on("data", (data) => console.log("Received", data))
        .on("close", () => {
          setError("The peer has disconnected.");
          setConnectionStatus("");
          setInGame(false);
        })
        .on("error", (err) => {
          setError(getFriendlyErrorMessage(err));
          console.error(err);
        });
    }
  };

  return inGame ? (
    <Multiplayer conn={conn} />
  ) : (
    <div className="flex flex-col justify-center items-center">
      <div className="flex bg-gray-400 p-2 m-2 rounded-lg text-white">
        <p className="flex-1">Your ID: {peerId}</p>
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

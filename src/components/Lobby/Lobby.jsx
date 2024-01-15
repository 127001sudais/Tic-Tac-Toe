import React, { useEffect, useState } from "react";
import Multiplayer from "../Multiplayer/Multiplayer";
import LobbyUI from "./LobbyUI";
import {
  initializePeer,
  connectToPeer,
  closePeerConnection,
  getFriendlyErrorMessage,
} from "../../utils/peerConnection";

/**
 * MLobby component handles the lobby state and peer-to-peer connections.
 */
const MLobby = () => {
  const [peerId, setPeerId] = useState("");
  const [friendPeerId, setFriendPeerId] = useState("");
  const [error, setError] = useState("");
  const [inGame, setInGame] = useState(false);
  const [conn, setConn] = useState(null);

  // Effect to initialize the peer connection when the component mounts
  useEffect(() => {
    const peerInstance = initializePeer(
      setPeerId,
      handleIncomingConnection,
      handleError
    );

    return () => closePeerConnection(peerInstance);
  }, []);

  // Handles incoming peer connections
  const handleIncomingConnection = (connection) => {
    console.log("Incoming connection", connection);
    setInGame(true);
    setConn(connection);
    setupConnectionEventHandlers(connection);
    connection.send({ type: "assign-symbol", symbol: "O" });
  };

  const setupConnectionEventHandlers = (connection) => {
    connection
      .on("data", handleReceivedData)
      .on("close", handleConnectionClose)
      .on("error", handleError);
  };

  const handleError = (err) => {
    console.error("Peer error", err);
    setError(getFriendlyErrorMessage(err));
  };

  // ⚠️ Handles data received from a peer connection
  const handleReceivedData = (data) => {
    console.log("Received data", data);
    // ⚠️ Handle the received data to update the game state
  };

  // Handles the event when a connection is closed
  const handleConnectionClose = () => {
    setError("The peer has disconnected.");
    setInGame(false);
  };

  // Handles initiating a connection to a peer
  const handleConnectToPeer = () => {
    setError("");
    const connection = connectToPeer(
      friendPeerId,
      setupConnectionEventHandlers,
      handleError
    );

    if (connection) {
      setInGame(true);
      setConn(connection);
      connection.send({ type: "assign-symbol", symbol: "X" });
    }
  };

  // Render Multiplayer or LobbyUI based on the in-game state
  return inGame ? (
    <Multiplayer conn={conn} />
  ) : (
    <LobbyUI
      peerId={peerId}
      friendPeerId={friendPeerId}
      setFriendPeerId={setFriendPeerId}
      handleConnectToPeer={handleConnectToPeer}
      error={error}
    />
  );
};

export default MLobby;

import React, { useEffect, useState } from "react";
import Multiplayer from "../Multiplayer/Multiplayer";
import LobbyUI from "./LobbyUI";
import {
  initializePeer,
  connectToPeer,
  closePeerConnection,
  getFriendlyErrorMessage,
} from "../../utils/peerConnection";

const MLobby = () => {
  const [peerId, setPeerId] = useState("");
  const [friendPeerId, setFriendPeerId] = useState("");
  const [error, setError] = useState("");
  const [inGame, setInGame] = useState(false);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    const peerInstance = initializePeer(
      (id) => setPeerId(id),
      (conn) => {
        console.log("Incoming connection", conn);
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

    return () => closePeerConnection(peerInstance);
  }, []);

  const handleConnectToPeer = () => {
    setError("");

    const connection = connectToPeer(
      friendPeerId,
      (conn) => {
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

/**
 * PeerJS Wrapper Module
 *
 * This module provides simple functions to abstract the complexity of the PeerJS library.
 */

import Peer from "peerjs";

let peer = null;

/**
 * Executes a callback function safely if it's a function.
 * @param {function} callback - The callback to execute.
 * @param {...any} args - Arguments to pass to the callback.
 */
const safeExecute = (callback, ...args) => {
  if (typeof callback === "function") {
    callback(...args);
  }
};

/**
 * Initializes a peer connection.
 * @param {function} onOpen - Callback when the connection is opened.
 * @param {function} onConnection - Callback when a connection is received.
 * @param {function} onError - Callback when an error occurs.
 * @returns The Peer instance.
 */
export const initializePeer = (onOpen, onConnection, onError) => {
  peer = new Peer();

  peer.on("open", (id) => safeExecute(onOpen, id));
  peer.on("connection", (conn) => safeExecute(onConnection, conn));
  peer.on("error", (err) => safeExecute(onError, err));

  return peer;
};

/**
 * Connects to a friend's peer.
 * @param {string} friendPeerId - The friend's peer ID.
 * @param {function} onOpen - Callback when the connection is opened.
 * @param {function} onError - Callback when an error occurs.
 * @returns The connection object or null if there was an error.
 */
export const connectToPeer = (friendPeerId, onOpen, onError) => {
  if (!peer) {
    const error = new Error("Peer not initialized");
    console.error(error.message);
    safeExecute(onError, error);
    return null;
  }

  if (!friendPeerId) {
    const error = new Error("Friend's Peer ID is required");
    console.error(error.message);
    safeExecute(onError, error);
    return null;
  }

  let connection = null;

  try {
    connection = peer.connect(friendPeerId);

    connection.on("open", () => {
      console.log(`Connected to peer: ${friendPeerId}`);
      safeExecute(onOpen, connection);
    });

    connection.on("error", (err) => {
      console.error("Connection failed", err);
      safeExecute(onError, err);
    });

    connection.on("close", () => {
      console.log("Connection has been closed");
      safeExecute(onError, new Error("Connection has been closed"));
    });
  } catch (error) {
    console.error("Failed to connect to peer:", error);
    safeExecute(onError, error);
  }

  return connection;
};

/**
 * Closes the peer connection when it's no longer needed.
 */
export const closePeerConnection = () => {
  if (peer && !peer.destroyed) {
    peer.destroy();
  }
};

/**
 * Maps error types to user-friendly messages.
 * @param {Error} error - The error object to map.
 * @returns A user-friendly error message.
 */
export const getFriendlyErrorMessage = (error) => {
  switch (error.type) {
    case "peer-not-initialized":
      return "Please initialize your connection before attempting to connect.";
    case "peer-id-required":
      return "You must enter your friend's peer ID to connect.";
    case "connection-timeout":
      return "The connection attempt took too long. Please try again.";
    case "connection-closed":
      return "The connection was closed unexpectedly.";
    case "connection-error":
      return "An error occurred during the connection.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
};

import Peer from "peerjs";

let peer = null;

// Function to safely execute callback if it's a function
const safeExecute = (callback, ...args) => {
  if (typeof callback === "function") {
    callback(...args);
  }
};

// Function to initialize a peer connection
export const initializePeer = (onOpen, onConnection, onError) => {
  peer = new Peer();

  peer.on("open", (id) => safeExecute(onOpen, id));
  peer.on("connection", (conn) => safeExecute(onConnection, conn));
  peer.on("error", (err) => safeExecute(onError, err));

  return peer;
};

// Function to connect to a friend's peer, with error handling
export const connectToPeer = (friendPeerId, onOpen, onError) => {
  if (!peer) {
    const error = new Error("Peer not initialized");
    console.error(error.message);
    if (onError) onError(error);
    return null;
  }

  if (!friendPeerId) {
    const error = new Error("Friend's Peer ID is required");
    console.error(error.message);
    if (onError) onError(error);
    return null;
  }

  let connection = null;

  try {
    connection = peer.connect(friendPeerId);

    // Listen for successful connection
    connection.on("open", () => {
      console.log(`Connected to peer: ${friendPeerId}`);
      if (onOpen) onOpen(connection);
    });

    // Listen for errors on the connection
    connection.on("error", (err) => {
      console.error("Connection failed", err);
      if (onError) onError(err);
    });
  } catch (error) {
    console.error("Failed to connect to peer:", error);
    if (onError) onError(error);
  }

  // Handle disconnections
  if (connection) {
    connection.on("close", () => {
      console.log("Connection has been closed");
      if (onError) onError(new Error("Connection has been closed"));
    });
  }

  return connection;
};

// Function to close the peer connection when no longer needed
export const closePeerConnection = () => {
  if (peer && !peer.destroyed) {
    peer.destroy();
  }
};

// Function to map error types to user-friendly messages
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

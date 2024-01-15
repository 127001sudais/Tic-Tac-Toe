import { render, screen, fireEvent } from "@testing-library/react";
import LobbyUI from "../../../components/Lobby/LobbyUI";

describe("LobbyUI", () => {
  const setup = (peerId = "123**********345", error = "") => {
    const utils = render(
      <LobbyUI
        peerId={peerId}
        friendPeerId=""
        setFriendPeerId={jest.fn()}
        handleConnectToPeer={jest.fn()}
        error={error}
      />
    );
    return {
      ...utils,
    };
  };

  it("should display the user peer ID", () => {
    setup();
    expect(screen.getByTestId("your-id")).toHaveTextContent(
      "Your ID: 123**********345"
    );
  });

  it("should accept input for the friend's peer ID", () => {
    const setFriendPeerId = jest.fn();
    render(
      <LobbyUI
        peerId=""
        friendPeerId=""
        setFriendPeerId={setFriendPeerId}
        handleConnectToPeer={jest.fn()}
        error=""
      />
    );

    const input = screen.getByTestId("input-peer-id");
    fireEvent.change(input, { target: { value: "67890" } });

    expect(setFriendPeerId).toHaveBeenCalledWith("67890");
  });

  it("should call handleConnectToPeer when connect button is clicked", () => {
    const handleConnectToPeer = jest.fn();
    render(
      <LobbyUI
        peerId=""
        friendPeerId=""
        setFriendPeerId={jest.fn()}
        handleConnectToPeer={handleConnectToPeer}
        error=""
      />
    );

    fireEvent.click(screen.getByTestId("connect-peer"));
    expect(handleConnectToPeer).toHaveBeenCalled();
  });

  it("should display an error message if there is an error", () => {
    const errorMessage = "Connection failed";
    setup("", errorMessage);

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      `⚠️ Error: ${errorMessage}`
    );
  });
});

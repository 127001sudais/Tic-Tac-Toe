# Multiplayer Mode
## The Flow:
1. User navigates to the Multiplayer mode.
2. User will be in lobby.
3. Lobby consist of a text area and an input area with a unique id generated by PeerJS.
4. User will share the id with another user.
5. Another user will enter the id in the text area and click on the "Join" button.
6. Both users will be redirected to the game. (The game component will be rendered in place of lobby component)
7. Both users will be able to play the game.
8. The users can play as many games as they want until they leave the lobby.
 

 ## example:
    user A shared the id, user B entered the id and clicked on the "Join" button.
    Both users will be redirected to the game, if the connection is successful. (The game component will be rendered in place of lobby component)
# Two-Player Real-Time Battleship web app using React.
I am attempting to create a two-player Battleship game as an excercise in learning the details of the React framework. Ultimately, I would like it to incorporate user authentication and a real-time backend such that players will be able to log in and play games against their friends in real time.

## General Checklist
User Authentication
- [ ] player either signs up or logs in
- [ ] upon login, player arrives at Lobby

User Lobby
  - [ ] shows a list of friends who are currently logged in
    - [ ] updates in real-time
  - [ ] user should be able to search for users and request to be friends
  - [ ] user chooses logged-in friend and asks to start game
  - [ ] if friend accepts, game starts

Game Start
- [ ] ship placement board
  - [ ] player chooses currentShip by clicking buttons
  - [ ] player chooses currentDirection by clicking buttons
    - [ ] clicking on ship type sets active ship for placement
    - [ ] selecting that ship again should set currentShip to null
  - [ ] after selecting ship, hovering over board shows potential ship position by changing look of appropriate squares
    - [ ] invalid squares (off board or currently occupied by different ship) look different
  - [ ] click on a square confirms the placement of the ship, stores the positions in shipPositions
    - [ ] clicking while there are invalid squares prevents saving the positions
    - [ ] squares with placed ships in them look different
- [ ] ship placement finished
  - [ ] when all ships are placed, display Ready button
    - [ ] clicking Ready button confirms that the player is ready to play
  - [ ] when both players are ready, the game starts

Wish List
- [ ] placing ship disables that ship button, clears out currentShip
  - [ ] clicking on placed ship makes it possible to replace the ship

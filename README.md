# React Battleship
In preparation for starting Prime Digital Academy, I decided to work ahead by learning React on my own. I got so carried away, that I ended up building a two-player Battleship game!



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
  - [x] player chooses currentShip by clicking buttons
  - [x] player chooses currentDirection by clicking buttons
    - [x] clicking on ship type sets active ship for placement
      - [ ] eventually have toggling button group
  - [x] after selecting ship, hovering over board shows potential ship position by changing look of appropriate squares
    - [x] invalid squares (off board or currently occupied by different ship) look different
  - [x] click on a square confirms the placement of the ship, stores the positions in shipPositions
    - [x] clicking while there are invalid squares prevents saving the positions
    - [x] squares with placed ships in them look different
- [ ] ship placement finished
  - [ ] when all ships are placed, display Ready button
    - [ ] clicking Ready button confirms that the player is ready to play
  - [ ] when both players are ready, the game starts

Wish List
- [ ] placing ship disables that ship button, clears out currentShip
  - [ ] clicking on placed ship makes it possible to move and place the ship again

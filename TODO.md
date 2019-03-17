# TODO

## Frontend

### v0.1

- [x] Add header draft
- [x] Create World canvas
- [x] Click and drag edit cells on the path
- [x] Implement game's logic
- [x] Allow user to select its color
- [x] Start / Stop game

### v0.1.1

- [x] Fix tests
- [x] Create tests for the latest implemented features

### v0.2

- [ ] Add duration count
- [x] Add round count
- [ ] Fix position of header
- [ ] Add patterns
- [ ] Patterns can be positioned by the client
- [x] Add `Reset` button

### v0.3 - Add server integration

- [x] Connect to the server
- [x] Receive players information
- [x] Send information about user
- [ ] Add clear own cells (before running)
- [ ] Allow user to set its own name

### v0.4

- [ ] Add rooms list
- [ ] Create room button
- [ ] Add `More Information about the game` button

### v0.4.1

- [ ] Refactor canvas logic

## Backend

### v0.1

- [ ] Add single user support
- [ ] Receive game data and store
- [ ] Receive start flag
- [ ] Receive snapshots and store it to allow new users to join the game

### v0.2

- [ ] Allow more players to join a single game
- [ ] Synchronize information between players
- [ ] Start game at the same time
- [ ] Keep synchronization while game is running
- [ ] Handle user disconnection from uninitialized game

### v0.3

- [ ] Add support for multiple games (rooms)

# Conway's Game of Life

This is an implementation of Conway's Game of Life.

> This is still a draft. 
> 
> Many features are still to be developed, like: creation of rooms, adding multiplayer support, resize of world grid...  
> Check the [TODO.md](./TODO.md) for a the tasks planning.
>
> I plan to do it on my free time 🕺

```diff
- Tests are broken!
```

## 🍹 Live demo

Check the live demo in: https://conway.pennaid.com

## How it works

The frontend application takes care of calculating the "world" state.  
In this way, the heavy load of the application is with the clients, instead of the server (scalability and performance win).

The client creates a room and select the World size, room's name, round interval and how many players will be allowed to join.  
After creating the room, the client can share the link with other people for them to join the same room
or wait for random people to join from the list (**v0.1 - not done yet**).

The players can select its own colors and flag `READY` to start the game.
The game only start after all players say they are ready.

**The World is still open for changes!**  
Any player can change its color and add more cells in the World.

## Frontend (Vue.js)

The decision for Vue.js is simply because I am currently developing with it in my work.

This was the first time I worked with `<canvas>`.  
I decided to use it because it has better performance to handle this dynamics.  
It also allows for interesting features: zooming, navigation...

## Backend Server (Node.js)

> In this version there is no backend server.

The backend job will be to synchronize the players inside the room and new players.

To do this, the communication between client and server will be done using WebSocket
([ws](https://www.npmjs.com/package/ws), [socket.io](https://www.npmjs.com/package/socket.io), etc... Not yet decided).
To configure the room and include new players while the game is not started is straight forward:
just send to the server, validate, store (in memory, no database for this application) and synchronize the state.
After the game is running involves more attention.

After a certain amount of rounds, a snapshot of the current state will be sent to the server and checked between the clients.  
On inconsistance, the server will update the clients with the majority's state.  
The server will store this snapshot, so any other player requesting for this information
will be able to recompute the current state based on this snapshot.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

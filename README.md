# Conway's Game of Life

This is an implementation of Conway's Game of Life.

> Many features are still to be developed, like: creation of rooms, handling new players in the middle of a session,
> allowing world mutation when the game is stopped, tracking player's colors when editing the world...  
> Check the [TODO.md](./TODO.md) for a the tasks planning.
>
> I plan to do it on my free time 🕺

```diff
- The tests in `helper` are shown as broken but are not in fact broken (so I `skipped` them).
- There is a weird behavior that don't return the value set in the function
- (but it works if you are using `--watch` and save the `.test` file)
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

## Frontend (Vue.js)

The decision for Vue.js is simply because I am currently developing with it in my work.

This was the first time I worked with `<canvas>`.  
I decided to use it because it has better performance to handle this dynamics.  
It also allows for interesting features: zooming, navigation...

I didn't use a 2D array to create the matrix of the cells,
instead I used a mix of `Set` and `Map` to read only the live cells and its neighboring cells.
This way the application don't have to iterate through the whole array and check all neighboring cells.
With no optimization, on a 50x50 matrix, this would mean 50x50x8 = 20,000 iterations (8 neighboring cells),
but with my current solution this max iterations will only happen if ALL cells are alive at once,
(what can only happen at the first round of the game).

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
npm run test
```

### Known issues

- [ ] When selecting cells, they disappear until the server accepts the creation
- [ ] Cell's colors do not change according to changes in the picked color

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

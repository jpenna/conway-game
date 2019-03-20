# Conway's Game of Life

This is an implementation of Conway's Game of Life.

> Many features are still to be developed, like: creation of rooms, handling new players in the middle of a session,
> allowing world mutation when the game is stopped, tracking player's colors when editing the world...  
>
> I plan to do it on my free time 🕺

```diff
- The tests in `helper` are shown as broken but are not in fact broken (so I `skipped` them).
- There is a weird behavior that don't return the value set in the function
- (but it works if you are using `--watch` and save the `.test` file)
```

## TODO

Check the [TODO.md](./TODO.md) for the planned tasks.

## 🍹 Live demo

Check the live demo in: https://conway.pennaid.com

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

## How it works

The frontend application takes care of calculating the "world" state.  
In this way, the heavy load of the application is with the clients, instead of the server (scalability and performance win).

The client creates a room and select the World size, room's name, round interval and how many players will be allowed to join.  
After creating the room, the client can share the link with other people for them to join the same room
or wait for random people to join from the list (**v0.1 - not done yet**).

The players can select its own colors and flag `READY` to start the game.
The game only start after all players say they are ready.

> For each player to start with a different color, upon connection, the server will set a color for the player

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
(what can only happen at the first round of the game). On  the other hand, there might be some performance issues
when deciding for `Map` over `Array` (check Tradeoffs below).

### Tradeoffs

Having each client run the game by themselves take the load out of the server, but makes it more difficult to 
have all clients synchronized. On the other hand, even if the server was taking care of calculating the state,
the clients would have different states due to delay of the network. When the players pause the game, the state
should be sent to the server and the highest round should be broadcasted to everybody, so they all would be
on the same state.

Due to time constraints, I couldn't focus much on tests, so I decided to: don't do e2e tests, don't test the `.vue`
components, and skip most of the test cases (but write the description, so I can remember what I should write for
each function and have a clear understanding of the purpose of each function).

The current implementation does not have good efficiency over the network: most of the updates are sent as the
whole new state. This is good for consistency, since there are multiple players, but could be solved by sending
sporadic snapshots to handle the state, instead of updating everything (example, players list, world state).

For this demo and because of time constraints, the application is really inefficient when rendering the world:
for every update it will re-render the whole thing.
I want to improve it by using 3 layers: 1 for the grid, 1 for the highlight of cell (hovering) and 1 for the
live cells. This way, when hovering, only the hovered area will be rendered. Also, when the game updates, only the
involved cells should re-render.

There are also vulnerabilities warned on Github on dependencies used by my dependencies. I will try to fix it keeping
my current dependencies, by starting an issue or changing updating the versions for the project only. 
If not possible, I can change the used dependencies.

Another issue that I left open is the use of `Map` to handle the world. Each `key` is a position string in the
form `x,y`, and the values are the colors (which I am going to replace for the player's entity when players are editing the world).
I am not sure about the performance of accessing `Map` values against `Array`, so I want to run a benchmark to validate this.
To test the efficiency, I will try a 2D `Array` with the whole size of the map (50x50, for example),
where a live cell holds a player entity and a dead cell is `null`, and an `Array` of `Array` holding the live cells positions (`[x, y`]).
Then I would iterate over the "positions Array" to check only the live cells and in the end of the round, replace this "positions
array" with a new `Array` containing the new values. This way I keep the idea of not checking the whole world all the time, and
I have the better (?) access speed of `Array` for this case.

### Known issues

- [ ] When selecting multiple cells, they disappear until the server accepts the creation (add a delay to remove a cell when created)
- [ ] Cell's colors do not change according to changes in the picked color (keep track of players, instead of hard coded color)
- [ ] After changing color, player can't delete previous cells (same as above)
- [ ] Time and rounds between players can vary (+-2 points) (won't solve, but send snapshot to keep same state when the game is stopped)
- [ ] Can't edit world after game starts (keep snapshot of game in the server, so it won't restart from the initial state on changes)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

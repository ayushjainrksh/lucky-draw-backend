# Lucky draw backend

## Problem statement
Design & implement a service which allows users to get Lucky Draw Raffle tickets and use one lucky draw raffle ticket to participate in a lucky draw game.

### Requirements
- Design an API which allows users to get the raffle tickets. This API can be consumed in a lot of ways like We can call this API after the user has placed an Order.
- Design an API which shows the next Lucky Draw Event timing & the corresponding reward. For example - Lucky Draw can run everyday at 8AM. Reward on say 10th Feb is Phone, 11th Feb is Washing Machine etc.
- Design an API which allows users to participate in the game. Once a user has participated with a raffle ticket, they shouldn’t be able to participate again in the same event.
- Design an API which lists all the winners of all the events in the last one week.
- Compute the winner for the event and announce the winner.

## Design
![Lucky draw design](/static/luckydraw-design.png)

## Tech stack
- APIs : Node.js, Express.js, Cron jobs
- Database : MongoDB

## Setup

1. Clone the repo
#### `git clone https://github.com/ayushjainrksh/lucky-draw-backend.git`
2. Install dependencies
#### `npm install`
3. Add env file
#### `touch .env`
4. Add following to env
```
JWT_ENCRYPTION = <encryption token>
JWT_EXPIRATION = <expiration time>
MONGO_URI = <add a mongodb atlas URI or you can leave it to use your local mongodb database>
```
5. Start the server
#### `npm start`

## APIs

### Lucky Draw service
To get raffle ticket
- `GET /ticket`

### Event schedule service
Get event timings and prizes
- `GET /events`
- `GET /events/upcoming`

### Participate service
- `POST /enter`

### Winners service
- `GET /winners`

### Declare winner service
Runs a cron job to pick the winner and update the database.

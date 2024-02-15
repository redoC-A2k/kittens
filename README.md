## About game - 
This is an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on reveal button a card is revealed and that card is removed from the deck.
A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

## Rules for game - 
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

## Building the project
1. Clone the project and install dependencies by running ```npm install``` in both client and server directories
2. For client set env variable ```REACT_APP_BACKEND``` this will be url to backend server without any trailing slash
example: if backend is on localhost and port 4000 then value of variable will be
```sh
REACT_APP_BACKEND=http://localhost:4000
```
3. For server set env variables ```PORT```,```REDIS_CLI_URL```, ```FRONTEND_URL``` here PORT will be port on which backend server will run , REDIS_CLI_URL is simply the url of redis server and FRONTEND_URL is url of frontend client (again without trailing slash as explained above) 
4. Run ```npm run start``` in both client and server directories

##tic-tac-toe

To launch the application, run 'server.js' via Node and navigate to localhost:8080 in a browser.

The client-side is just HTML, CSS, and jQuery.  The only state maintained by the client is which player's turn it is if there is a game in progress.  The client communicates with the server using the LogicService module.

The back-end is a Node/Express server which serves static content and maintains the game state and logic within the logic controller.
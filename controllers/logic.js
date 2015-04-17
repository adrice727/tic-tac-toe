var cells = {};  // Maintains state of board

/* Request handlers */
exports.move = function(req, res) {
  var player = req.body.player;
  var cell = req.body.cell;

  var responseInfo = {};
  responseInfo.valid = validMove(player, cell);
  responseInfo.winner = checkForWinner();
  if ( !responseInfo.winner ) {
    responseInfo.draw = (Object.keys(cells).length === 9);
  }

  res.send(responseInfo);
}

exports.reset = function(req, res) {
  cells = {};
  res.send({reset: true});
}

/* Helper functions */
function validMove(player, cell) {
  if ( !cells[cell] ) {
    cells[cell] = player;
    return true;
  } else {
    return false;
  }
}
 
function checkForWinner(){

  var winner = horizontalWinner() || verticalWinner()  || diagonalWinner();
  return winner;

  function horizontalWinner (){
    if ( !!cells[1] && cells[1] === cells[2] && cells[2] === cells[3] ) { return {player: cells[1], cells: 'r1'};}
    if ( !!cells[4] && cells[4] === cells[5] && cells[5] === cells[6] ) { return {player: cells[4], cells: 'r2'};}
    if ( !!cells[7] && cells[7] === cells[8] && cells[8] === cells[9] ) { return {player: cells[7], cells: 'r3'};}
    return false;
  }

  function verticalWinner (){
    if ( !!cells[1] && cells[1] === cells[4] && cells[4] === cells[7] ) { return {player: cells[1], cells: 'c1'};}
    if ( !!cells[2] && cells[2] === cells[5] && cells[5] === cells[8] ) { return {player: cells[2], cells: 'c2'};}
    if ( !!cells[3] && cells[3] === cells[6] && cells[6] === cells[9] ) { return {player: cells[3], cells: 'c3'};}
    return false;
  }

  function diagonalWinner (){
    if ( !!cells[1] && cells[1] === cells[5] && cells[5] === cells[9] ) { return {player: cells[1], cells: 'd1'};}
    if ( !!cells[3] && cells[3] === cells[5] && cells[5] === cells[7] ) { return {player: cells[3], cells: 'd2'};}
    return false;
  }
}


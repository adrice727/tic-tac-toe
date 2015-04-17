$(function(){

  var logic = new LogicService();
  var gameStatus = 1; // O: game over; 1: player1; 2: player2
  var pause = false;

  // Event Handlers
  $('.cell.open').on('click', function(){
    // var cell = $(this).data('id');
    var cell = $(this).attr('id');
    console.log(cell);
    if (!pause) { move(cell); }
  })

  $('.cell.open').hover(
    function(){
      var classes = {1: 'cell-hover-x', 2: 'cell-hover-o'};
      var cell = $(this);
      cell.addClass(classes[gameStatus]);
    },
    function(){
      var cell = $(this);
      cell.removeClass('cell-hover-x cell-hover-o');
    }
  )

  $('.new-game').on('click', function(){
    logic.reset().then(function(reset){
      if ( reset ) { updateStatus({reset: reset}); }
    });
  })

  // Helper functions
  function move(cell) {
    pause = !pause;
    logic.move(gameStatus, cell).then(function(data) {
      if ( data.valid ) { 
        addMarker(cell);
        updateStatus(data);
        pause = !pause;
      }
    });
  };

  function addMarker(cell) {
    var classes = {1: 'cell-x', 2: 'cell-o'};
    var e = $('#' + cell);
    e.removeClass('open .cell-hover-x::after, .cell-hover-o');
    e.addClass(classes[gameStatus]);
  }

  function updateStatus(status){
    if ( status.winner || status.draw ) {
      gameStatus = 0;
    } else if ( status.reset ) {
      $('.cell').removeClass('cell-x cell-o winner');
      gameStatus = 1;
    } else {
      gameStatus = gameStatus === 1 ? 2 : 1;
    } 
    updateDisplay(status);
  }

  function updateDisplay (status) {
    console.log(status);
    if ( status.winner ) {
      var winningCells = status.winner.cells.split('');
      winningCells.forEach(function(cell){
        $('#' + cell).addClass('winner');
      })
      $('.game-status').text('Player ' + status.winner.player + ' wins!');
    } else if ( status.draw ) {
      $('.game-status').text('This game is a draw');
    } else {
      var player = gameStatus === 1 ? 'Player One' : 'Player Two';
      $('.game-status').text(player + '\'s Turn');
    }
  }
})
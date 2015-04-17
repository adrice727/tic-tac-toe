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

  function move(cell) {
    pause = !pause;
    logic.move(gameStatus, cell).then(function(data) {
      if ( data.valid ) { 
        addMarker(cell);
        updateStatus(data.winner, data.draw);
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
    console.log('xoxoxo', status);
    // updateDisplay(status);
    if ( status.winner || status.draw ) {
      gameStatus = 0;
    } else if ( status.reset ) {
      $('.cell').removeClass('cell-x cell-o');
      gameStatus = 1;
    } else {
      gameStatus = gameStatus === 1 ? 2 : 1;
    } 
  }


  // function updateBoard(cell, winner) {
  //   var e = $('#' + cell);
  //   var classes = {1: 'cell-x', 2: 'cell-o'};
  //   e.removeClass('open');
  //   e.addClass(classes[gameStatus]);
  //   updateGameStatus(winner);
  // }

  // function updateGameStatus(winner) {
  //   if ( winner ) {
  //     var winningCells = winner.cells.split('');
  //     var classes = {1: 'winner-x', 2: 'winner-o'};
  //     winningCells.forEach(function(cell) {
  //       $('.cell[data-item-id="' + cell +  '"]').addClass(classes[gameStatus]);
  //     })
  //     $('.game_status').text('Player ' + gameStatus + ' wins!');
  //     $('.status-container').show();
  //   }
  // }

})
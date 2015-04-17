
var LogicService = (function(){

  var service = function(){};

  var url = 'http://localhost:8080';
  $.ajaxSetup({contentType: 'application/json; charset=utf-8'}); //Default to JSON

  service.prototype.move = function(player, cell) {
    var params = JSON.stringify({player: player, cell: cell});
    var deferred = $.Deferred();
    $.post(url + '/move', params).then(
      function(data){
        deferred.resolve(data);
      },
      function(error){
        deferred.reject(error);
      }
    );
    return deferred.promise();  
  };


  service.prototype.reset = function(){
    var deferred = $.Deferred();
    $.post(url + '/reset').then(
      function(data){
        deferred.resolve(true);
      },
      function(error){
        deferred.reject(false);
      }
    );
    return deferred.promise();  
  };

  return service;

})();
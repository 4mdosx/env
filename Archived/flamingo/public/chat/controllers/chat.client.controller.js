angular.module('chat').controller('ChatController', ['$scope', 'Socket',
  function($scope,Socket){
    $scope.message = [];
    Socket.on('chatMessage',function(message){
      $scope.message.push(message);
    });

    $scope.sendMessage = function(){
      var message = {
        text:this.message
      };

      Socket.emit('chatMessage', message);

      this.messageText = "";
    };

    $scope.$on($destory, function(){
      Socket.removeListener('chatMessage');
    });
  }]);

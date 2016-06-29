var net = require('net');

var server = net.createServer(function (socket){
    socket.on('data',function(data){
        socket.write('hello');
    })

    socket.on('end',function(){
        console.log('断开');
    })

    socket.write('welcome to Node.js');

})

server.listen(7122,function(){
    console.log('server bound');
})

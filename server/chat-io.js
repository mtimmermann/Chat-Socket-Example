var userList = [];

module.exports = function(server) {

	var io = require('socket.io')(server);

	/**
	 * Handle the socket.io connections
	 */
	io.on('connection', function(socket) {

	  socket.on('Message', function(data) { // Broadcast message to all
	    if (hasName(socket)) {
	      var transmit = {date : new Date().toISOString(), name : socket.name, message : data};
	      socket.broadcast.emit('Message', transmit);
	      console.log(transmit['name'] +' said "'+ data +'"');
	      //sendUserListData(); // Send user list data to all connected users
	    }
	  });

	  socket.on('SetName', function(name) { // Assign name to user
	    if (userList.indexOf(name) === -1) { // Test if name is taken
	      userList.push(name);
	      socket.name = name;
	      socket.emit('AddNameStatus', 'ok');
	      console.log('user '+ name +' connected');
	      sendUserListData(); // Send user list data to all connected users
	    } else {
	      socket.emit('AddNameStatus', 'error') // Name is taken, send an error message
	    }
	  });

	  // socket.on('GetUserList', function() {
	  // 	sendUserListData();
	  // });
	  socket.on('AmIConnected', function(name) {
	  	var connected = hasName(socket) && socket.name === name;
	  	socket.emit('AmIConnected', connected);
	  });

	  socket.on('disconnect', function() { // User has disconnected
	    if (hasName(socket)) {
	      console.log('Socket disconnect. Remvoving user: '+ socket.name);
	      var newList = userList.filter(function(user) {
	        return user !== socket.name;
	      });
	      userList = newList;
	      sendUserListData();
	    }
	  });
	});

	/**
	 * Send socket.io messeage w/ user list data
	 */
	function sendUserListData() { // Send User List data
	  io.sockets.emit('UserListData', {
	    'count': userList.length,
	    'list': userList
	  });
	}

	/**
	 * Returns true if socket has a user name
	 */
	function hasName(socket) {
	  return socket.name ? true : false;
	}

};

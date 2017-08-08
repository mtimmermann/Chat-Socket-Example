'use strict';

var app = app || {};
var io = io || {};
var PubSub = PubSub || {};

app = $.extend({}, app,
  (function ($) {

    var userName = '',
        modals = {
          chooseName: {
            show: function() { $('#modalChooseName').modal('show'); },
            hide: function() { $('#modalChooseName').modal('hide'); }
          }
        };

    function addMessage(msg, name, date, isMe) {
      PubSub.publish('NewMessage', {
        message: msg,
        name: name,
        date: date,
        isMe: isMe
      });
    }

    // Socket.io
    var socket = io.connect();
    socket.on('connect', function() {
      console.log('connected');
    });
    socket.on('UserListData', function(data) {
      // TODO: Pubsub to react component
      console.log('socket.on->UserListData TODO: Pubsub to react component');
      console.log('UserListData: '+ JSON.stringify(data));
      PubSub.publish('UserListData', $.extend(data, { curUserName: userName }));
    });
    socket.on('message', function(data) {
      addMessage(data.message, data.name, new Date().toISOString(), false);
      console.log('socket.on->message'+ data);
    });

    /**
     * Public methods
     */
    return {

      modals: modals,

      /**
       * Adds a connected user name to sever list
       * @param {string} name The user name
       * @param {function} callback(success)
                The function that is called after name added via io.socket
                {object} success: true if successful
       */
      addName: function(name, callback) {
        socket.emit('SetName', name);
        socket.on('AddNameStatus', function(data) {
          if (data === "ok") {
            callback(true /* isSuccess */);
            userName = name;
          } else {
            callback(false /* isSuccess */);
          }
        });
      },

      /**
       * Sends a user's message to the server via io.socket
       * @param {string} message The user's message
       * @param {function} callback(success)
                The function that is called after message sent
                {object} success: true if successful
       */
      sendMessage: function(message, callback) {
        if (userName === '') {
          modals.chooseName.show();
          callback(false /* isSuccess */);
        } else {
          socket.emit('message', message);
            callback(true /* isSuccess */);
        }
      },

      /**
       * Apply jQuery.timeago plugin to all timestamps in chat box
       */
      timeAgo: function() {
        $('#chat-box time').each(function() {
          $(this).text($.timeago($(this).attr('title')));
        });
      },

      /**
       * Initialize the app data and app stock chart
       */
      init: function() {
        modals.chooseName.show();

        $('#chat-box').slimScroll({height: '400px'});

        // After every render of the chatbox, roll the scroll bar down
        PubSub.subscribe('ChatBoxRendered', function(data) {
          console.log('ChatBoxRendered');
          $('#chat-box').slimScroll({ scrollTo: $('#chat-box')[0].scrollHeight });
        });

        app.utils.timeout(2000, function() {
          console.log('2 secs');
        });
        setInterval(function() {
          app.timeAgo();
        }, 30000);
      }
    };

  }(jQuery))
);

$(document).ready(function() {
  app.init();
});


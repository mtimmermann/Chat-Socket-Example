"use strict";

var app = app || {};

var io = io || {};

var PubSub = PubSub || {};

app = $.extend({}, app, function($) {
    var userName = "", modals = {
        chooseName: {
            show: function() {
                $("#modalChooseName").modal("show");
            },
            hide: function() {
                $("#modalChooseName").modal("hide");
            }
        }
    };
    function addMessage(msg, name, date, isMe) {
        PubSub.publish("NewMessage", {
            message: msg,
            name: name,
            date: date,
            isMe: isMe
        });
    }
    var socket = io.connect();
    socket.on("connect", function() {
        console.log("connected");
    });
    socket.on("UserListData", function(data) {
        console.log("socket.on->UserListData TODO: Pubsub to react component");
        console.log("UserListData: " + JSON.stringify(data));
        PubSub.publish("UserListData", $.extend(data, {
            curUserName: userName
        }));
    });
    socket.on("message", function(data) {
        addMessage(data.message, data.name, new Date().toISOString(), false);
        console.log("socket.on->message" + data);
    });
    return {
        modals: modals,
        addName: function(name, callback) {
            socket.emit("SetName", name);
            socket.on("AddNameStatus", function(data) {
                if (data === "ok") {
                    callback(true);
                    userName = name;
                } else {
                    callback(false);
                }
            });
        },
        sendMessage: function(message, callback) {
            if (userName === "") {
                modals.chooseName.show();
                callback(false);
            } else {
                socket.emit("message", message);
                callback(true);
            }
        },
        timeAgo: function() {
            $("#chat-box time").each(function() {
                $(this).text($.timeago($(this).attr("title")));
            });
        },
        init: function() {
            modals.chooseName.show();
            $("#chat-box").slimScroll({
                height: "400px"
            });
            PubSub.subscribe("ChatBoxRendered", function(data) {
                console.log("ChatBoxRendered");
                $("#chat-box").slimScroll({
                    scrollTo: $("#chat-box")[0].scrollHeight
                });
            });
            app.utils.timeout(2e3, function() {
                console.log("2 secs");
            });
            setInterval(function() {
                app.timeAgo();
            }, 3e4);
        }
    };
}(jQuery));

$(document).ready(function() {
    app.init();
});

"use strict";

var app = app || {};

app.utils = app.utils || {};

app.utils = $.extend({}, function($) {
    return {
        timeout: function(interval, callback) {
            var start = Date.now();
            (function f() {
                var diff = Date.now() - start, ns = (interval - diff) / 1e3 >> 0, m = ns / 60 >> 0, s = ns - m * 60;
                if (diff > interval) {
                    callback();
                    return void 0;
                }
                setTimeout(f, 10);
            })();
        }
    };
}(jQuery));
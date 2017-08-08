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
                $('input[name="message"]').focus();
            }
        }
    };
    var socket = io.connect();
    function addMessage(msg, name, date, isMe) {
        PubSub.publish("NewMessage", {
            message: msg,
            name: name,
            date: date,
            isMe: isMe
        });
    }
    function addName(name, callback) {
        if (!name) {
            callback(false);
        } else {
            socket.emit("SetName", name);
            socket.on("AddNameStatus", function(data) {
                if (data === "ok") {
                    callback(true);
                    userName = name;
                } else {
                    callback(false);
                }
            });
        }
    }
    socket.on("connect", function() {
        console.log("connected");
    });
    socket.on("UserListData", function(data) {
        console.log("UserListData: " + JSON.stringify(data));
        PubSub.publish("UserListData", $.extend(data, {
            curUserName: userName
        }));
    });
    socket.on("message", function(data) {
        addMessage(data.message, data.name, new Date().toISOString(), false);
    });
    socket.on("AmIConnected", function(isConnected) {
        if (!isConnected && userName) {
            console.log("Connection lost, attempting to re-connect");
            addName(userName, function(isSuccess) {
                console.log("Re-connected? " + isSuccess);
            });
        }
    });
    return {
        modals: modals,
        addName: function(name, callback) {
            addName(name, function(isSuccess) {
                callback(isSuccess);
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
            app.utils.timeout(1e3, function() {
                $('input[name="name"]').focus();
            });
            $("#chat-box").slimScroll({
                height: "400px"
            });
            PubSub.subscribe("ChatBoxRendered", function(data) {
                console.log("ChatBoxRendered");
                $("#chat-box").slimScroll({
                    scrollTo: $("#chat-box")[0].scrollHeight
                });
            });
            setInterval(function() {
                app.timeAgo();
            }, 2e4);
            setInterval(function() {
                if (socket.connected) {
                    socket.emit("AmIConnected", userName);
                }
            }, 1e4);
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
        },
        focusFirstInput: function() {
            $("form:first *:input[type!=hidden]:first").focus();
        }
    };
}(jQuery));
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var UserListDisplay = function(_React$Component) {
            _inherits(UserListDisplay, _React$Component);
            function UserListDisplay(props) {
                _classCallCheck(this, UserListDisplay);
                return _possibleConstructorReturn(this, (UserListDisplay.__proto__ || Object.getPrototypeOf(UserListDisplay)).call(this, props));
            }
            _createClass(UserListDisplay, [ {
                key: "render",
                value: function render() {
                    var userRows = [], curUser = this.props.userData.curUserName;
                    var users = this.props.userData.list.filter(function(user) {
                        return user !== curUser;
                    });
                    users.forEach(function(user) {
                        userRows.push(React.createElement("li", null, user));
                    });
                    return React.createElement("div", {
                        className: "user-list-info"
                    }, this.props.userData.list.length > 0 && React.createElement("div", null, React.createElement("p", null, "Welcome ", this.props.userData.curUserName), React.createElement("p", null, "Other Users Online (", users.length, " online)")), React.createElement("ul", null, userRows));
                }
            } ]);
            return UserListDisplay;
        }(React.Component);
        var MessageRow = function(_React$Component2) {
            _inherits(MessageRow, _React$Component2);
            function MessageRow(props) {
                _classCallCheck(this, MessageRow);
                return _possibleConstructorReturn(this, (MessageRow.__proto__ || Object.getPrototypeOf(MessageRow)).call(this, props));
            }
            _createClass(MessageRow, [ {
                key: "render",
                value: function render() {
                    var msg = this.props.messageData;
                    var divClasses = msg.isMe ? "row message self" : "row message";
                    return React.createElement("div", {
                        className: divClasses
                    }, React.createElement("p", {
                        className: "message-info"
                    }, React.createElement("span", {
                        className: "user"
                    }, msg.name, ", "), React.createElement("time", {
                        className: "date",
                        title: msg.date
                    }, msg.date)), React.createElement("p", {
                        className: "message-text"
                    }, msg.message));
                }
            } ]);
            return MessageRow;
        }(React.Component);
        var MessageForm = function(_React$Component3) {
            _inherits(MessageForm, _React$Component3);
            function MessageForm(props) {
                _classCallCheck(this, MessageForm);
                var _this3 = _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).call(this, props));
                _this3.handleChange = _this3.handleChange.bind(_this3);
                _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
                _this3.state = {
                    message: ""
                };
                return _this3;
            }
            _createClass(MessageForm, [ {
                key: "handleChange",
                value: function handleChange(e) {
                    var newState = {};
                    newState[e.target.name] = e.target.value;
                    this.setState(newState);
                }
            }, {
                key: "handleSubmit",
                value: function handleSubmit(e) {
                    e.preventDefault();
                    var self = this;
                    app.sendMessage(this.state.message, function(success) {
                        if (success) {
                            self.props.addMessage({
                                message: self.state.message,
                                name: "Me",
                                date: new Date().toISOString(),
                                isMe: true
                            });
                            self.setState({
                                message: ""
                            });
                        }
                    });
                }
            }, {
                key: "render",
                value: function render() {
                    return React.createElement("div", {
                        className: "message-form-div"
                    }, React.createElement("form", {
                        onSubmit: this.handleSubmit,
                        novalidate: true
                    }, React.createElement("div", {
                        className: "input-group"
                    }, React.createElement("input", _defineProperty({
                        name: "message",
                        type: "text",
                        className: "form-control",
                        placeholder: "Enter a message",
                        onChange: this.handleChange,
                        value: this.state.message
                    }, "value", this.state.message)), React.createElement("span", {
                        className: "input-group-btn"
                    }, React.createElement("button", {
                        className: "btn btn-success",
                        type: "submit",
                        disabled: !this.state.message
                    }, "Send")))));
                }
            } ]);
            return MessageForm;
        }(React.Component);
        var ChatSection = function(_React$Component4) {
            _inherits(ChatSection, _React$Component4);
            function ChatSection(props) {
                _classCallCheck(this, ChatSection);
                var _this4 = _possibleConstructorReturn(this, (ChatSection.__proto__ || Object.getPrototypeOf(ChatSection)).call(this, props));
                _this4.addMessage = _this4.addMessage.bind(_this4);
                _this4.state = {
                    messages: [],
                    userListData: {
                        curUserName: "",
                        list: []
                    }
                };
                return _this4;
            }
            _createClass(ChatSection, [ {
                key: "componentWillMount",
                value: function componentWillMount() {
                    this.messageToken = PubSub.subscribe("NewMessage", this.externalMessage.bind(this));
                    this.userDataToke = PubSub.subscribe("UserListData", this.userDataUpdate.bind(this));
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    PubSub.unsubscribe(this.messageToken);
                }
            }, {
                key: "componentDidUpdate",
                value: function componentDidUpdate() {
                    $("time").each(function() {
                        $(this).text($.timeago($(this).attr("title")));
                    });
                    PubSub.publish("ChatBoxRendered", {});
                }
            }, {
                key: "externalMessage",
                value: function externalMessage(msg, data) {
                    console.log("pubsub-> " + msg + JSON.stringify(data));
                    this.addMessage(data);
                }
            }, {
                key: "userDataUpdate",
                value: function userDataUpdate(msg, data) {
                    console.log("pubsub-> " + msg + JSON.stringify(data));
                    this.setState({
                        userListData: {
                            curUserName: data.curUserName,
                            list: data.list
                        }
                    });
                }
            }, {
                key: "addMessage",
                value: function addMessage(data) {
                    var newMessages = this.state.messages.map(function(msg) {
                        return msg;
                    });
                    newMessages.push(data);
                    this.setState({
                        messages: newMessages
                    });
                    console.log("addMessage");
                }
            }, {
                key: "render",
                value: function render() {
                    var messageRows = [];
                    this.state.messages.forEach(function(msg) {
                        messageRows.push(React.createElement(MessageRow, {
                            messageData: msg
                        }));
                    });
                    return React.createElement("div", {
                        className: "col-lg-12"
                    }, React.createElement("div", {
                        id: "chat-box"
                    }, messageRows), React.createElement(MessageForm, {
                        addMessage: this.addMessage
                    }), React.createElement(UserListDisplay, {
                        userData: this.state.userListData
                    }));
                }
            } ]);
            return ChatSection;
        }(React.Component);
        ReactDOM.render(React.createElement(ChatSection, null), document.querySelector("#chat-section"));
    }, {} ]
}, {}, [ 1 ]);
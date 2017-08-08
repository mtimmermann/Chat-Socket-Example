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
        var ChooseName = function(_React$Component) {
            _inherits(ChooseName, _React$Component);
            function ChooseName(props) {
                _classCallCheck(this, ChooseName);
                var _this = _possibleConstructorReturn(this, (ChooseName.__proto__ || Object.getPrototypeOf(ChooseName)).call(this, props));
                _this.handleChange = _this.handleChange.bind(_this);
                _this.handleSubmit = _this.handleSubmit.bind(_this);
                _this.state = {
                    name: "",
                    isError: false
                };
                return _this;
            }
            _createClass(ChooseName, [ {
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
                    app.addName(this.state.name, function(success) {
                        if (!success) {
                            self.setState({
                                isError: true
                            });
                        } else {
                            self.setState({
                                name: "",
                                isError: false
                            });
                            app.modals.chooseName.hide();
                        }
                    });
                }
            }, {
                key: "render",
                value: function render() {
                    var _React$createElement;
                    return React.createElement("div", {
                        id: "modalChooseName",
                        className: "modal fade",
                        role: "dialog",
                        "aria-labelledby": "modalChooseName",
                        "aria-hidden": "true",
                        "data-backdrop": "static",
                        "data-keyboard": "false"
                    }, React.createElement("div", {
                        className: "modal-dialog"
                    }, React.createElement("div", {
                        className: "modal-content"
                    }, React.createElement("div", {
                        className: "modal-header"
                    }, React.createElement("h3", null, "Choose a name")), React.createElement("div", {
                        className: "modal-body"
                    }, React.createElement("form", {
                        onSubmit: this.handleSubmit,
                        novalidate: true
                    }, React.createElement("div", {
                        className: "input-group"
                    }, React.createElement("input", (_React$createElement = {
                        name: "name",
                        type: "text",
                        className: "form-control",
                        placeholder: "Enter a chat name/handle",
                        onChange: this.handleChange,
                        value: this.state.name
                    }, _defineProperty(_React$createElement, "value", this.state.name), _defineProperty(_React$createElement, "autoComplete", "off"), 
                    _React$createElement)), React.createElement("span", {
                        className: "input-group-btn"
                    }, React.createElement("button", {
                        className: "btn btn-success",
                        type: "submit",
                        disabled: !this.state.name
                    }, "Go to chat")))), React.createElement("div", null, this.state.isError ? React.createElement("div", {
                        className: "alert alert-danger"
                    }, "This name is taken. Please choose another.") : React.createElement("div", null))))));
                }
            } ]);
            return ChooseName;
        }(React.Component);
        var ModalsSection = function(_React$Component2) {
            _inherits(ModalsSection, _React$Component2);
            function ModalsSection(props) {
                _classCallCheck(this, ModalsSection);
                return _possibleConstructorReturn(this, (ModalsSection.__proto__ || Object.getPrototypeOf(ModalsSection)).call(this, props));
            }
            _createClass(ModalsSection, [ {
                key: "render",
                value: function render() {
                    return React.createElement("div", null, React.createElement(ChooseName, null));
                }
            } ]);
            return ModalsSection;
        }(React.Component);
        ReactDOM.render(React.createElement(ModalsSection, null), document.querySelector("#modals-section"));
    }, {} ]
}, {}, [ 1 ]);
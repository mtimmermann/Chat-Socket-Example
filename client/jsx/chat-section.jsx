
class UserListDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var userRows = [],
  			curUser = this.props.userData.curUserName;

  	var users = this.props.userData.list.filter(function(user) { return user !== curUser; })
  	users.forEach((user) => {
  		userRows.push(<li>{user}</li>);
  	});
  	return (
  		<div className="user-list-info">
  			{ this.props.userData.list.length > 0 &&
  			<div>
  				<p>Welcome {this.props.userData.curUserName}</p>
  				<p>Other Users Online ({users.length} online)</p>
  			</div>
  			}
  			<ul>
  				{userRows}
  			</ul>
  		</div>
  	);
  }
};


class MessageRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var msg = this.props.messageData;
  	var divClasses = msg.isMe ? 'row message self' : 'row message';
  	return (
  		<div className={divClasses}>
  			<p className="message-info">
  				<span className="user">{msg.name}, </span>
  				<time className="date" title={msg.date}>{msg.date}</time>
  			</p>
  			<p className="message-text">{msg.message}</p>
  		</div>
  	);
  }
};


class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
    	message: ''
    }
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
  	e.preventDefault();

  	var self = this;
  	app.sendMessage(this.state.message, function(success) {
  		if (success) {
  			self.props.addMessage({
  				message: self.state.message,
  				name: 'Me',
  				date: new Date().toISOString(),
  				isMe: true
  			});
  			self.setState({ message: '' });
  		}
  	});
  }

  render() {
  	return (
  		<div className="message-form-div">
        <form onSubmit={this.handleSubmit} novalidate>
        	<div className="input-group">
            <input name="message" type="text" className="form-control"
							placeholder="Enter a message"
              onChange={this.handleChange} value={this.state.message}
            	value={this.state.message} />
            <span className="input-group-btn">
              <button className="btn btn-success" type="submit" disabled={!this.state.message}>Send</button>
            </span>
        	</div>
        </form>
  		</div>
  	);
  }
}

class ChatSection extends React.Component {
  constructor(props) {
    super(props);

    this.addMessage = this.addMessage.bind(this);

    this.state = {
    	messages: [],
    	userListData: {
    		curUserName: '', // Name of this current user
    		list: []
    	}
    };

  }

  // Subscribe for pubsub from main app. External messages are subscribed to here
  // Pubsub w/ react and pubsub-js
  //   See: https://anthonymineo.com/communication-between-independent-components-in-react-using-pubsubjs/
	componentWillMount() {
		this.messageToken = PubSub.subscribe('NewMessage', this.externalMessage.bind(this));
		this.userDataToke = PubSub.subscribe('UserListData', this.userDataUpdate.bind(this));
	}
	//componentDidMount() {}
	componentWillUnmount() {
		PubSub.unsubscribe(this.messageToken);
	}
	componentDidUpdate() {
		// Wire up jquery.timeago plugin to chat timestamps after render
    $('time').each(function() {
      $(this).text($.timeago($(this).attr('title')));
    });

    // Publish a message that the chat box has been rendered
    PubSub.publish('ChatBoxRendered', {});
	}

	// External messages recieved here
	externalMessage(msg, data) {
		console.log('pubsub-> '+ msg + JSON.stringify(data));
		this.addMessage(data);
	}

	// External pubsub user data update recieved here
	userDataUpdate(msg, data) {
		console.log('pubsub-> '+ msg + JSON.stringify(data));
		this.setState({
			userListData: {
				curUserName: data.curUserName,
				list: data.list
			}
		});
	}

  addMessage(data) {
  	var newMessages = this.state.messages.map(function(msg) { return msg; });
  	newMessages.push(data);
  	this.setState({messages: newMessages});
  	console.log('addMessage');
  }

  render() {

  	var messageRows = [];
  	this.state.messages.forEach((msg) => {
  		messageRows.push(<MessageRow messageData={msg} />);
  	});

  	return (
			<div className="col-lg-12">
  			<div id="chat-box">
  				{messageRows}
  			</div>
  			<MessageForm addMessage={this.addMessage} />
  			<UserListDisplay userData={this.state.userListData} />
  		</div>
  	);
  }
};

ReactDOM.render(<ChatSection />, document.querySelector('#chat-section'));

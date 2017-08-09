class ChooseName extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
    	name: '',
    	isError: false
    }
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  //handleSubmit = (e, message) => {
  handleSubmit(e) {
  	e.preventDefault();

  	var self = this;
  	app.addName(this.state.name, function(success) {
  		if (!success) {
  			self.setState({isError: true});
  		} else {
  			self.setState({
  				name: '',
  				isError: false
  			});
  			app.modals.chooseName.hide();
  		}
  	});
  }

  render() {
  	return (
		  <div id="modalChooseName" className="modal fade" role="dialog" aria-labelledby="modalChooseName"
		  		aria-hidden="true" data-backdrop="static" data-keyboard="false">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          {/*<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>*/}
		          <h3>Choose a name</h3>
		        </div>
		        <div className="modal-body">
		          <form onSubmit={this.handleSubmit} novalidate>
		          	<div className="input-group">
			            <input name="name" type="text" className="form-control"
										placeholder="Enter a chat name/handle"
			              onChange={this.handleChange} value={this.state.name}
			            	value={this.state.name} autoComplete="off" />
			            <span className="input-group-btn">
			              <button className="btn btn-success" type="submit" disabled={!this.state.name}>Go to chat</button>
			            </span>
		          	</div>
		          </form>
		          <div>
			        	{this.state.isError ? (
			          <div className="alert alert-danger">
			            This name is taken. Please choose another.
			          </div>
			          ) : (
			          <div></div>
			          )}
		          </div>
		        </div>
		        {/*<div className="modal-footer">
		        	{this.state.isError ? (
		          <div className="alert alert-danger">
		            This name is taken. Please choose another.
		          </div>
		          ) : (
		          <div></div>
		          )}
		        </div>*/}
		      </div>
		    </div>
		  </div>
  	)
  }
};

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="modalAbout" className="modal fade" role="dialog" aria-labelledby="modalAbout" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3>About Chat Socket.io</h3>
            </div>
            <div className="modal-body">
              <h5>Server</h5>
              <ul>
                <li>Node.js</li>
                <li>Express 4</li>
                <li>socket.io</li>
              </ul>
              <h5>Client JS</h5>
              <ul>
                <li>React 15.6</li>
                <li>JQuery 3.2.1
                  <ul>
                    <li>JQuery Slim-Scroll plugin</li>
                    <li>JQuery Timeago plugin</li>
                  </ul>
                </li>
                <li>PubSub-JS</li>
              </ul>
              <h5>Client Style</h5>
              <ul>
                <li>Bootstrap-Sass 3.3.7</li>
              </ul>
            </div>
            <div className="modal-footer">
              <a href="https://github.com/mtimmermann/chat-socket-example">Source Code on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

class ModalsSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div>
  			<ChooseName />
        <About />
  		</div>
  	)
  }
};

ReactDOM.render(<ModalsSection />, document.querySelector('#modals-section'));

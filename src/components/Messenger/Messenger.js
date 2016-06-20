import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Messenger.css';
const cx = require('classnames');
import { connect } from 'react-redux';
import { sendMsg, updateMsger } from '../../redux/actions/messenger';
import fetch from 'isomorphic-fetch';

const io = require('socket.io-client');
const socket = io.connect('http://tedxchatbot.herokuapp.com');

class Messenger extends Component {
  static propTypes = {
    messenger: PropTypes.object,
    sendMsg: PropTypes.func.isRequired,
    updateMsger: PropTypes.func.isRequired,
  };

	chatWithBot(props) {
		var data = {
			user: 'You',
			channel: socket.io.engine.id,
			text: props.messenger.input,
		  time: new Date().getTime()
		};
		socket.emit('message', data);
    props.updateMsger('');
    return props.messenger.input;
	};

	componentWillMount() {
    const comp = this;

		socket.on('connect', function() {
			console.log('Client has connected to the server!');
      socket.on('message', function(data) {
        data.user = { name: data.user, className: s.them };
        comp.props.sendMsg(data);
      });
		});
		socket.on('disconnect', function() {
			console.log('The client has disconnected!');
		});
	};

	render() {
    return (<div className={s.wrapper}>
		     <nav id="nav" className={s.nav}>
					 <div className={s.defaultNav}>
			        <div className={s.mainNav}>
			          <div className={s.toggle}>
			          </div>
			          <div className={s.mainNavItem}>
			            <a className={s.mainNavItemLink}>Chat</a>
			          </div>
			          <div className={s.options}>
			          </div>
			        </div>
					</div>
		     </nav>
		      <div className={s.inner}>
		        <div className={s.content}>
							{this.props.messenger.messageList.map((item, index) => (
								<div key={index} className={cx(s.messageWrapper, item.user.className)}>
			            <div className={cx(s.circleWrapper, "animated bounceIn")} style={{backgroundImage:`url("${item.user.avatar}")`, backgroundPosition:'-70px -285px'}}></div>
			            <div className={s.textWrapper}>{item.text}</div>
			          </div>
							))}
						</div>
		      </div>
		      <div className={s.bottom}>
		          <textarea className={s.input} value={this.props.messenger.input} onChange={(e) => {
                  this.props.updateMsger(e.target.value);
                  e.preventDefault();
                }}></textarea>
		          <div className={s.send} onClick={(e) => {
                  this.props.sendMsg({
						        user: {
											avatar:'',
											className: s.me
										},
						        text: this.chatWithBot(this.props),
						        time: new Date().getTime()
						      });
                  e.preventDefault();
                }}></div>
		      </div>
	     </div>
		);
  }
}

const mapState = state => ({
  messenger: state.messenger,
});

const mapDispatch = {
  sendMsg,
  updateMsger,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Messenger));

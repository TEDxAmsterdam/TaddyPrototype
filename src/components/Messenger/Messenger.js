import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Messenger.css';
const cx = require('classnames');

import { connect } from 'react-redux';
import { sendMsg, updateMsger } from '../../redux/actions/messenger';

class Messenger extends Component {
  static propTypes = {
    messenger: PropTypes.object,
    sendMsg: PropTypes.func.isRequired,
    updateMsger: PropTypes.func.isRequired,
  };

	componentDidMount() {
		this.props.sendMsg({
			user: {
				avatar:'//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
				className: s.them
			},
			text: 'Hello! My name is TeddyX, What is your name?',
			time: new Date().getTime()
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
		          <textarea className={s.input} onChange={(e) => {
                  this.props.updateMsger(e.target.value);
                  e.preventDefault();
                }}></textarea>
		          <div className={s.send} onClick={(e) => {
                  this.props.sendMsg({
						        user: {
											avatar:'',
											className: s.me
										},
						        text: this.props.messenger.input,
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

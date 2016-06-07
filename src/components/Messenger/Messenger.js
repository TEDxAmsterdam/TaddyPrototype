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

	render() {
    return (
			 <div className={s.wrapper}>
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
								<div key={index} className={s.messageWrapper}>
			            <div className={cx(s.circleWrapper, "animated bounceIn")}></div>
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
						        user: 'test',
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

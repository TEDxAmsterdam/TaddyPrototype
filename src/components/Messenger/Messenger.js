import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Messenger.css';
class Messenger extends Component {
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
		        <div className={s.content}></div>
		      </div>
		      <div className={s.bottom}>
		          <textarea className={s.input}></textarea>
		          <div className={s.send}></div>
		      </div>
	     </div>
		);
  }
}
export default withStyles(s)(Messenger);

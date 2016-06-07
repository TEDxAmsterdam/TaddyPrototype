/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 import React, { PropTypes } from 'react';
 import withStyles from 'isomorphic-style-loader/lib/withStyles';
 import s from './Chat.css';

 const title = 'TEDDYxAmsterdam';

 function Chat(props, context) {
   context.setTitle(title);
   return (
     <div className={s.wrapper}>
       <nav className={s.nav}>
			 		<div className={s.main-nav}>
						<div className={s.toggle}>
						</div>
						<div className={s.main-nav-item}>
							<a className={s.main-nav-item-link}>{title}</a>
						</div>
						<div className={s.options}>
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

 Chat.contextTypes = { setTitle: PropTypes.func.isRequired };

 export default withStyles(s)(Chat);

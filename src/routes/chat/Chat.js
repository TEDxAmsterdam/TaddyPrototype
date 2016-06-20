/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {
  PropTypes,
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import { connect } from 'react-redux';
import Messenger from '../../components/Messenger/';
import { sendMsg, updateMsger } from '../../redux/actions/messenger';


const title = 'TEDDYxAmsterdam';

function Chat(props, context) {
  context.setTitle(title);
  return (<Messenger />);
}

Chat.contextTypes = {
  setTitle: PropTypes.func.isRequired,
};

const mapState = state => ({
  messenger: state.messenger,
});

const mapDispatch = {
  sendMsg,
  updateMsger,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Chat));

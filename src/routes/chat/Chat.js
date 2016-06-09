/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {
  PropTypes
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chat.css';
import Messenger from '../../components/Messenger/';
import {
  sendMsg,
  updateMsger
} from '../../redux/actions/messenger';

const title = 'TEDDYxAmsterdam';

const Wit = require('node-wit').Wit;
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    cb(context);
  },
  error(sessionId, context, error) {
    console.log(error.message);
  },
};
const client = new Wit('KJN5XTUXGTW27DC7VJ4Y64QX6N7BZXA5', actions);
const context = {};
client.message('Hi my name is Dave', context, (error, data) => {
  if (error) {
    console.log('Oops! Got an error: ' + error);
  } else {
    sendMsg({
      user: {
        avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
        className: s.them
      },
      text: JSON.stringify(data),
      time: new Date().getTime()
    });

    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
  }
});

function Chat(props, context) {
  context.setTitle(title);
  return ( < Messenger / > );
}

Chat.contextTypes = {
  setTitle: PropTypes.func.isRequired
};

export default withStyles(s)(Chat);

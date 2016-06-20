import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MessengerStyles from './Messenger.css';
const cx = require('classnames');
import { connect } from 'react-redux';
import { sendMsg, updateMsger } from '../../redux/actions/messenger';
import fetch from 'isomorphic-fetch';

@withStyles(MessengerStyles)
@connect(state => ({ messenger: state.messenger }), { sendMsg, updateMsger})
export default class Messenger extends Component {
  static propTypes = {
    messenger: PropTypes.object,
    sendMsg: PropTypes.func.isRequired,
    updateMsger: PropTypes.func.isRequired,
  };

  chatWithBot() {
    const { messenger, sendMsg } = this.props;

    fetch(`/api/bot?message=${messenger.input}`)
      .then(response => response.json())
      .then((data) => {
        if (data.text) {
          const update = {
            user: {
              avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
              className: MessengerStyles.them,
            },
            text: data.text,
            time: new Date().getTime(),
          };
          sendMsg(update);
        }
      });

    return messenger.input;
  }

  onTextInput(e) {
    this.props.updateMsger(e.target.value);
  }

  onSendButtonClicked() {
    this.props.sendMsg({
      user: {
        avatar: '',
        className: MessengerStyles.me,
      },
      text: this.chatWithBot(),
      time: new Date().getTime(),
    });
  }

  render() {
    const messages = this.props.messenger.messageList.map((item, index) => (
      <div key={index} className={cx(MessengerStyles.messageWrapper, item.user.className)}>
        <div className={cx(MessengerStyles.circleWrapper, "animated bounceIn")}
             style={{backgroundImage:`url("${item.user.avatar}")`,
             backgroundPosition:'-70px -285px'
             }}>
        </div>
        <div className={MessengerStyles.textWrapper}>{item.text}</div>
      </div>
    ));

    return (
      <div className={MessengerStyles.wrapper}>
        <nav id="nav" className={MessengerStyles.nav}>
          <div className={MessengerStyles.defaultNav}>
            <div className={MessengerStyles.mainNav}>
              <div className={MessengerStyles.toggle}>
              </div>
              <div className={MessengerStyles.mainNavItem}>
                <a className={MessengerStyles.mainNavItemLink}>Chat</a>
              </div>
              <div className={MessengerStyles.options}>
              </div>
            </div>
          </div>
        </nav>
        <div className={MessengerStyles.inner}>
          <div className={MessengerStyles.content}>
            {messages}
          </div>
        </div>
        <div className={MessengerStyles.bottom}>
          <textarea className={MessengerStyles.input} onChange={::this.onTextInput}></textarea>
          <div className={MessengerStyles.send} onClick={::this.onSendButtonClicked}></div>
        </div>
      </div>
    );
  }
}

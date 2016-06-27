import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MessengerStyles from './Messenger.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { sendMsg, updateMsger } from '../../redux/actions/messenger';
import io from 'socket.io-client';

const socket = io.connect('http://tedxchatbot.herokuapp.com');

@withStyles(MessengerStyles)
@connect(state => ({ messenger: state.messenger }), { sendMsg, updateMsger})
export default class Messenger extends Component {
  static propTypes = {
    messenger: PropTypes.object,
    sendMsg: PropTypes.func.isRequired,
    updateMsger: PropTypes.func.isRequired,
  };

  componentWillMount() {
    // TODO This should not belong here this is the fetching of data.
    socket.on('connect', () => {
      console.log('Client has connected to the server!');
      socket.on('message', data => {
        const newData = { ...data, user: { name: data.user, className: MessengerStyles.them } };
        this.props.sendMsg(newData);
      });
    });

    socket.on('disconnect', () => {
      console.log('The client has disconnected!');
    });
  };

  chatWithBot() {
    const { messenger, updateMsger } = this.props;

    const data = {
      user: 'You',
      channel: socket.io.engine.id,
      text: messenger.input,
      time: new Date().getTime(),
    };
    socket.emit('message', data);
    updateMsger('');

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
    const { messenger } = this.props;

    const messages = this.props.messenger.messageList.map((item, index) => (
      <div key={index} className={cx(MessengerStyles.messageWrapper, item.user.className)}>
        <div className={cx(MessengerStyles.circleWrapper, "animated bounceIn")}
             style={{
                backgroundImage: `url("${item.user.avatar}")`,
                backgroundPosition: '-70px -285px',
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
          <textarea className={MessengerStyles.input} value={messenger.input} onChange={::this.onTextInput}></textarea>
          <div className={MessengerStyles.send} onClick={::this.onSendButtonClicked}></div>
        </div>
      </div>
		);
  }
}

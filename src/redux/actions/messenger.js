import * as ActionTypes from '../constants';

export function updateMsger(message) {
  return {
    type: ActionTypes.MESSENGER_UPDATE,
    payload: {
      message,
    },
  };
}

export function sendMsg(message) {
  return {
    type: ActionTypes.MESSENGER_SEND,
    payload: {
      message,
    },
  };
}

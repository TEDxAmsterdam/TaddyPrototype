import * as ActionTypes from '../constants';

let defaultState = {
  messageList: [],
  input: '',
};

export default function messenger(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.MESSENGER_UPDATE:
      return {
        ...state,
        input: action.payload.message,
      };
    case ActionTypes.MESSENGER_SEND:
		  state.messageList.push(action.payload.message);
      return {
        ...state,
      };
    default:
      return state;
  }
}

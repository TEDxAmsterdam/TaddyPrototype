import { MESSENGER_UPDATE, MESSENGER_SEND } from '../constants';

const defaultState = {
  messageList: [],
  input: '',
};

const actionsMap = {
  [MESSENGER_UPDATE]: (state, action) => ({ ...state, input: action.payload.message }),
  [MESSENGER_SEND]: (state, action) => (
    { ...state, messageList: [...state.messageList, action.payload.message] }
  ),
};

export default function messenger(state = defaultState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return { ...state, ...reduceFn(state, action) };
}

import { SET_RUNTIME_VARIABLE } from '../constants';

const actionsMap = {
  [SET_RUNTIME_VARIABLE]: (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
};

export default function runtime(state = {}, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return { ...state, ...reduceFn(state, action) };
}

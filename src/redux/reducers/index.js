import { combineReducers } from 'redux';
import runtime from './runtime';
import messenger from './messenger';

export default combineReducers({
  runtime,
  messenger,
});

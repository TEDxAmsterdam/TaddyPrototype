import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middleware = [sagaMiddleware];

  let enhancer;

  if (__DEV__) {
    if (process.env.BROWSER) {
      const createLogger = require('redux-logger');
      middleware.push(createLogger({
        collapsed: true,
      }));
    } else {
      // Server side redux action logger
      middleware.push(store => next => action => { // eslint-disable-line no-unused-vars
        const payload = JSON.stringify(action.payload);
        console.log(` * ${action.type}: ${payload}`); // eslint-disable-line no-console
        return next(action);
      });
    }

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  //sagaMiddleware.run()

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}

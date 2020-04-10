import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';

import { history } from './history';
import { AppReducer } from './reducer';

const configureStore = (historyInput: any) => {
  // const sagaMiddleware = createSagaMiddleware();
  // const middlewares: any[] = [sagaMiddleware];
  const middlewares: any[] = [];

  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const portalStore: Store<AppReducer.State> = createStore(
    AppReducer.rootReducer,
    composeEnhancer(
      applyMiddleware(routerMiddleware(historyInput), ...middlewares)
    )
  );
  // sagaMiddleware.run(rootSaga, exceptionHandler);
  return portalStore;
};

export const store = configureStore(history);

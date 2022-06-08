import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './helpers/focusOutlineManager';
import './helpers/utils';
import './index.css';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/authReducer';
import errorHandlerReducer from './store/reducers/errorHandlerReducer';
import repositoryReducer from './store/reducers/repositoryReducer';
import shipmentReducer from './store/reducers/shipmentReducer';
import { ConnectionProvider } from './components/shared/ConnectionContext';

// so we can use redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
	authentication: authReducer,
	shipment: shipmentReducer,
	errorHandler: errorHandlerReducer,
	repository: repositoryReducer
});

const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<ErrorBoundary>
				<BrowserRouter>
					<ConnectionProvider>
						<App />
					</ConnectionProvider>
				</BrowserRouter>
			</ErrorBoundary>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();

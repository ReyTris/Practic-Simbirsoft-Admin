import App from '@/App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('rootMain')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);

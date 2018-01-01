import main from './core/main';

declare global {
	interface Window {
		app: any;
	}
}

window.app = main;

export default main;

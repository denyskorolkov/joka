// import { getArray } from './helpers';

interface Handler {
	[index: string]: any;
}

interface HandlerSetting {
	id: string;
	ids?: string[];
}

export const handlers: Handler = {};

export const handlerSettings = new WeakMap<object, HandlerSetting>();
let countId: number = 0;

/**
 * Set if property id doesn't exist and get it
 *
 * @export
 * @this {object} Instance
 * @param {string} name Id or Prefix
 * @param {boolean} isPrefix Generate id with prefix (ex. `controller#12`)
 * @return {string} Id associated with `this` instance
 */
export function setId(this: object, name: string = ``, isPrefix: boolean = false) {
	// exe("log", "handler", this, name);
	let handlerSetting = handlerSettings.get(this);

	if (handlerSetting) {
		return handlerSetting.id;
	}

	if (!name || isPrefix) {
		name = `${name}#${countId++}`;
	}

	handlerSettings.set(this, {
		id: name
	});

	return name;
}

export default {
	setId,
	handlers
};

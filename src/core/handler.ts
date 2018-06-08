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
 * Set id if property that doesn't exist and get it
 *
 * @export
 * @this {object} Instance
 * @param {string} name Id or Prefix
 * @param {boolean} isPrefix Generate id with prefix (ex. `controller#12`)
 * @return {string} Id associated with `this` instance
 */
export function setId(this: object, name: string = ``, isPrefix: boolean = false) {
	// TODO: exe("log", "handler", this, name);
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

const BRACKETS = /[()]/g;
const BRACKETS_TRIM = /\(([^)]*)\)/gi;

/**
 * Get relevant id
 *
 * @export
 * @param {string | string[]} id Either ids array or single id
 * @returns {string} The most relevant id
 */
export function getRelevantId(id: string): string;
export function getRelevantId(id: string[]): string;
export function getRelevantId(id: any): string {
	if (Array.isArray(id)) {
		if (id[0].search(BRACKETS) != -1) {
			let rule: string = id.shift();
			let action = rule.replace(BRACKETS, ``);

			if (has(action)) {
				id = action;
			} else {
				for (let pattern of id) {
					if (
						(action = rule
							.replace(BRACKETS_TRIM, pattern)
							.replace(/\s+/g, ` `)
							.trim())
					) {
						if (has(action)) {
							id = action;
							break;
						}
					}
				}
			}
		} else {
			for (let action of id) {
				if (has(action)) {
					id = action;
					break;
				}
			}
		}
	} else {
		id = has(id) ? id : undefined;
	}
	return id;
}

/**
 * Check existing of current id
 *
 * @export
 * @param {string} id
 * @returns {boolean}
 */
export function has(id: string): boolean {
	return typeof handlers[id] != 'undefined';
}

// export function setInstance(instance: object, options: object): void {
// 	getArray(instance).forEach((item) => {});
// }

export function get(id: string, path: string): any {}

export function set(id: string, data: any): void;
export function set(data: object[]): void;
export function set(data: Function): void;
export function set(data: object): void;
export function set(this: any, a: any, b?: any): void {
	let type = typeof a;

	if (type == 'string') {
		handlers[a] = b;

		if (!this) {
			return;
		}

		let id = this.id || this;

		if (id) {
			let keyIds = `${id} ids`;
			if (has(keyIds)) {
				// push(keyIds, a);
			} else {
				set(keyIds, [a]);
			}
		}
	} else if (type == 'object') {
		for (let key in a) {
			if (typeof key == 'number') {
				set.call(this, a[key]);
			} else {
				set.call(this, key, a[key]);
			}
		}
	} else if (type == 'function') {
		set.call(this, a.name, a);
	} else {
		throw new Error('Arguments are not correct');
	}
}

export default {
	has,
	set,
	setId,
	handlers,
	getRelevantId
};

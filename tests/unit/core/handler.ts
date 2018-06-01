import { setId } from '../../../src/core/handler';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite(`jOka => handlers`, {
	setId() {
		let obj = {};
		assert.equal(setId.call({}), `#0`);
		assert.equal(setId.call(obj), `#1`);
		assert.equal(setId.call({}, `name`), `name`);
		assert.equal(setId.call({}, `prefix`, true), `prefix#2`);
		assert.equal(setId.call(obj), `#1`);
	}
});

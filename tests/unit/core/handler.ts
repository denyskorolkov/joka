import { setId, getRelevantId, handlers } from '../../../src/core/handler';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite(`joka => handlers`, {
	setId() {
		let obj = {};

		assert.equal(setId.call({}), `#0`);
		assert.equal(setId.call(obj), `#1`);
		assert.equal(setId.call({}, `name`), `name`);
		assert.equal(setId.call({}, `prefix`, true), `prefix#2`);
		assert.equal(setId.call(obj), `#1`);
	},

	getRelevantId() {
		handlers[`test get relevant id`] = true;
		handlers[`test get relevant id #1`] = true;
		handlers[`test get relevant id #2`] = true;
		handlers[`test get relevant id #2 context`] = true;

		assert.equal(getRelevantId(`test get relevant id #1`), `test get relevant id #1`);
		assert.equal(getRelevantId(`test get relevant id #3`), undefined);

		assert.equal(getRelevantId([`test get relevant id #1`, `test get relevant id #2`]), `test get relevant id #1`);

		assert.equal(
			getRelevantId([`test get relevant id unknown`, `test get relevant id #2`]),
			`test get relevant id #2`
		);

		assert.equal(getRelevantId([`test get relevant id (#2 context)`, `#2`, ``]), `test get relevant id #2 context`);

		assert.equal(getRelevantId([`test get relevant id (#1 context)`, `#1`, ``]), `test get relevant id #1`);

		assert.equal(getRelevantId([`test get relevant id (#3 context)`, `#3`, ``]), `test get relevant id`);
	}
});

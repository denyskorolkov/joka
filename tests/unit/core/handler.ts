import { handlers, setInstance, getRelevantId } from '../../../src/core/handler';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite(`joka => handlers`, {
	setInstance() {
		let obj = {};

		assert.equal(setInstance.call({}), `object#0`);
		assert.equal(setInstance.call(obj), `object#1`);
		assert.equal(setInstance.call(function() {}), `function#2`);
		assert.equal(setInstance.call([]), `object#3`);
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

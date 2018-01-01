import handler from '../../../src/core/handler';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite('Handler', {
	'set method exists'() {
		assert.isDefined(handler.set, 'handler method `set` is defined');
	}
});

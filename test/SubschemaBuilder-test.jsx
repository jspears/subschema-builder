var expect = require('expect');
var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var Subschema = require('subschema');
var SubschemaBuilder = require('../src/SubschemaBuilder.jsx');

describe('SubschemaBuilder', function () {
    function into(node, debug) {
        return debug ? React.render(node, document.getElementsByTagName('body')[0]) : TestUtils.renderIntoDocument(node);
    }


    it('should render', function () {
        var sb = into(<SubschemaBuilder valueManager={Subschema.ValueManager()}/>, true);
        expect(sb).toExist();
    })
});
"use strict";

var expect = require('expect');
var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var Simulate = TestUtils.Simulate;
var OrType = require('../src/OrType.jsx');
var {Form, ValueManager, loader} = require('subschema');
loader.addType('OrType', OrType);
loader.addTemplate('OrTypeTemplate', require('../src/template/OrTypeTemplate.jsx'));

describe.only('OrType', function () {
    function into(node, debug) {
        return debug ? React.render(node, document.getElementsByTagName('body')[0]) : TestUtils.renderIntoDocument(node);
    }


    it('should render', function () {
        var vm = ValueManager();
        var schema = {
            schema: {
                choose: {
                    type: 'OrType',
                    help: "Either This or that or that",
                    subSchema: {
                        'o1': {
                            type: 'Text',
                            help: 'This is the first choice',
                            title: "This has a title"
                        },
                        'o2': {
                            type: 'Checkbox',
                            help: 'This is the second choice'
                        },
                        'o3': 'Text'
                    }
                }
            }
        }
        var sb = into(<Form schema={schema} valueManager={vm}/>, false);

        vm.addListener(null, function (obj) {
            console.log('vm', obj);
        })
        expect(sb).toExist();
    });
    it('should render with a value', function () {
        var vm = ValueManager({o3: 'hello'});
        var schema = {
            choose: {
                type: 'OrType',
                title: 'Choose an o',
                help: "Either This or that or that",
                subSchema: {
                    'o1': {
                        type: 'Text',
                        help: 'This is the first choice',
                        title: "This has a title"
                    },
                    'o2': {
                        type: 'Checkbox',
                        help: 'This is the second choice'
                    },
                    'o3': 'Text'
                }
            }
        }
        var sb = into(<Form schema={{schema}} valueManager={vm}/>, false);

        vm.addListener(null, function (obj) {
            console.log('vm', obj);
        }, true)
        expect(sb).toExist();
    });
    it('should render meta schema', function () {

        var vm = ValueManager({});
        var schema = {
            choose: {
                type: 'OrType',
                title: 'Choose a type',
                subSchema: {
                    select: {
                        type: 'Object',
                        subSchema: {
                            options: {
                                type: 'List',
                                canAdd: true,
                                canEdit: true,
                                canRemove: true,
                                canReorder: true,
                                labelKey:'label',
                                itemType: {
                                    type: 'Object',
                                    subSchema: {
                                        val: 'Text',
                                        label: 'Text'
                                    }
                                },
                                help: 'Optional select'
                            }
                        }
                    },
                    text: {
                        type: 'Object',
                        subSchema: {
                            placeholder: 'Text'
                        }

                    }
                }
            },

            title: {
                type: 'Text',
                help: 'The title of the field'
            },
            help: {
                type: 'Text',
                help: 'Help text for the field'
            },
            template: {
                type: 'Select',
                options: ['a', 'b', 'c']
            }


        }
        var sb = into(<Form schema={{schema}} valueManager={vm}/>, true);

        vm.addListener(null, function (obj) {
            console.log('vm', obj);
        })
        expect(sb).toExist();
    })
});
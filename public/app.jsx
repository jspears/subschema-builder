"use strict";
var React = require('react');
var ValueManager = require('subschema').ValueManager;
var App = require('../src/Builder.jsx');
//Make testing easier.
var schema = {
    "schema": {

        "object": {
            "type": "Object",
            help: 'Shows an object',
            "subSchema": {
                name: {
                    type: 'Text'

                }
            }
        },
        "checkbox": {
            "type": "Checkbox",
            "help": "shows a checkbox"
        }
    }

};

React.render(<App valueManager={ValueManager(schema)}/>, document.getElementById('content'));
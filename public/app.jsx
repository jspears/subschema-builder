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
var vm = ValueManager(schema);
function clear(){
    vm.setValue({});
}
React.render(
    <App valueManager={vm}>
        <div>
            <button className="btn" onClick={clear}>clear</button>
        </div>
    </App>
    , document.getElementById('content'));
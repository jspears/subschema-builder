import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Subschema, {Form, loader, loaderFactory, DefaultLoader, ValueManager} from 'Subschema';
import App from './app.jsx';
var sampleSchema = {
    schema: {
        name: {
            type: 'Text',
            help: 'Type Text',
            template: {
                template: false
            }
        },
        title: {
            type: 'Select',
            help: 'Select Text',
            options: [{label: 'Mr.', val: 'Mr'}, {label: 'Mrs.', val: 'Ms'}, {label: 'Ms.', val: 'Ms'}],
            validators: 'required'
        },
        address: {
            type: 'Object',
            subSchema: {
                line1: {
                    type: 'Text'
                },
                line2: {
                    type: 'Text'
                }

            }
        }
    },
    fieldsets: [{
        legend: 'Mr So and So',
        fields: ['name', 'title']
    }]
}

loader.addSchema('SampleSchema', sampleSchema);

ReactDOM.render(<div><h1>SchemaBuilder Demo</h1><App loader={loader}/>
</div>, document.getElementById('content'));
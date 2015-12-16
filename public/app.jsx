"use strict";
import React, {Component} from 'react';
import Subschema, {decorators,types,Form, PropTypes,DefaultLoader, ValueManager, loaderFactory} from 'Subschema';
import SchemaBuilder from '../src/SchemaBuilder.jsx';
import ExpressionSelect from '../src/ExpressionSelect.jsx';
import defaults from 'lodash/object/defaults';
import SchemaBuilderContext from '../src/SchemaBuilderContext.jsx';
import normalizeSchema from '../src/normalize';
import builderLoader from '../src/loader';

var ObjectType = types.Object;


var schemaBuilder = {
    schema: {
        schema: {
            template: false,
            "type": "SchemaBuilder"
        },

        "fieldsets": {
            template: false,
            type: "FieldSetBuilder"
        },
        "preview": {
            template: false,
            "type": "Preview"
        },

        "schemaName": {
            "type": "ExpressionSelect",
            "placeholder": "New Schema",
            "optionsPath": "_schemas"
        },
        "schemaSelect": {
            type: "SchemaSelect",
            template: false
        }
    },
    fieldsets: [{
        legend: "Create/Edit a Schema",
        fields: ["schemaName", "schemaSelect"]
    }, {
        legend: "Modify Schema",
        fields: ["schema", "fieldsets", "preview", "schemaSelect"]
    }]
};



export default class App extends Component {
    static propTypes = {
        loader: PropTypes.loader.isRequired
    }
    render() {
        return <SchemaBuilderContext loader={this.props.loader} builderLoader={builderLoader}>
            <ObjectType schema={schemaBuilder} objectTemplate="WizardTemplate"/>
        </SchemaBuilderContext>
    }
}


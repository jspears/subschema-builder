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

var {listen} = decorators;

var schemaBuilder = {
    schema: {
        "editor": {
            template: false,
            type: "SchemaBuilderContext",
            subSchema: {
                schema: {
                    "schema": {
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
                    }

                },
                fieldsets: [{fields: ["schema", "fieldsets", "preview"]}]

            }
        },


        "schemaName": {
            "type": "ExpressionSelect",
            "placeholder": "New Schema",
            "optionsPath": "_schemas"
        }
    },
    fieldsets: [{
        legend: "Create/Edit a Schema",
        fields: ["schemaName"]
    }, {
        legend: "Modify Schema",
        fields: ["editor"]
    }]
};

class SchemaSelect extends Component {
    static contextTypes = defaults({
        origLoader: PropTypes.loader
    }, PropTypes.contextTypes);

    /* componentWillMount() {
     this.context.valueManager.update('schemaName', this.context.origLoader.listSchemas().map(t=> {
     return {
     label: t.name,
     val: t.name
     }
     }));
     }*/

    @listen("value", "schemaName", true)
    select(schemaName) {
        this.setState({schemaName})
        var builder;
        if (schemaName) {
            builder = this.context.origLoader.loadSchema(schemaName);
        }
        var schema = normalizeSchema(this.context.origLoader, builder).subSchema || {};
        this.context.valueManager.update('editor', schema);
    }

    render() {
        return <i className="selected-schema">Editing: {this.state.schemaName  || 'Untitled Schema'}</i>
    }
}
class OrigLoaderContext extends Component {
    static propTypes = {
        loader: PropTypes.loader
    }
    static childContextTypes = {
        origLoader: PropTypes.loader,
        loader: PropTypes.loader,
        valueManager: PropTypes.valueManager
    }

    getChildContext() {
        var valueManager = ValueManager({
            _schemas: this.props.loader.listSchemas().map(t=> {
                return {
                    label: t.name,
                    val: t.name
                }
            })

        });

        return {
            valueManager,
            loader: builderLoader,
            origLoader: this.props.loader
        }
    }

    render() {
        return <div>{this.props.children}</div>
    }
}

export default class App extends Component {
    static propTypes = {
        loader: PropTypes.loader.isRequired
    }


    render() {
        return <OrigLoaderContext loader={this.props.loader}>
            <ObjectType schema={schemaBuilder} objectTemplate="WizardTemplate"/>
            <SchemaSelect/>
        </OrigLoaderContext>
    }
}


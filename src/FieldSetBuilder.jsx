"use strict";

import React, {Component} from 'react';
import subschema, {loaderFactory, DefaultLoader, decorators, types, PropTypes, ValueManager} from 'subschema';
var ObjectType = types.Object;
var {listen} =decorators;

function makeSchema(loader) {
    var FieldSetSchema = {
        legend: {
            type: 'InputFalse',
            help: 'The legend for this fieldset'
        },
        template: {
            type: 'ExpressionSelect',
            optionsPath: "_templates",
            defaultValue:'FieldSetTemplate',
            help: 'Override the default template'
        },
        className: {
            type: 'Text',
            validator: ['cssClass'],
            help: 'Class name for this fieldset'
        },
        fields: {
            type: 'List',
            help: 'Fields included in this fieldset',
            canAdd: true,
            canEdit: true,
            canDelete: true,
            canReorder: true,
            itemType: {
                type: 'ExpressionSelect',
                optionsPath: '_allFields'
            }
        }
    };

    return {
        schema: {
            fieldsets: {
                type: 'List',
                labelKey: 'legend',
                canEdit: true,
                canReorder: true,
                canDelete: true,
                canAdd: true,
                itemType: {
                    type: 'Object',
                    subSchema: FieldSetSchema
                },
                contentTemplate: 'ContentTypeTemplate',
                createTemplate: 'ModalCreateTemplate'
            }
        },
        fieldsets: [{fields: 'fieldsets'}]
    };
}
export default class FieldSetBuilder extends Component {
    static contextTypes = PropTypes.contextTypes;
    static propTypes = {
        path: PropTypes.path
    }

    @listen("value", "schema")
    setSchema(schema) {
        var fields = Object.keys(schema);
        this.setState({schema, fields});
        this.context.valueManager.update('_allFields', fields);
        this.schema = makeSchema(this.context.loader);
    }

    render() {
        var {schema, ...props} = this.props;
        return <ObjectType {...props} schema={this.schema}/>

    }
}

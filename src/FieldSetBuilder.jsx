"use strict";

import React, {Component} from 'react';
import subschema, {loaderFactory, DefaultLoader, types, PropTypes, ValueManager} from 'subschema';
var ObjectType = types.Object;

function makeSchema(loader) {
    var FieldSetSchema = {
        legend: {
            type: 'Text',
            help: 'The legend for this fieldset'
        },
        template: {
            type: 'SelectDefault',
            optionsPath: "_templates",
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
    /*
     FieldSetSchema.fieldsets = {
     type: 'List',
     itemType: {
     type: 'Object',
     subSchema: FieldSetSchema
     }
     };*/

    return {
        schema: FieldSetSchema,
        fields: ['legend', 'template', 'className', 'fields']
    };
}
export default class FieldSetBuilder extends Component {
    static contextTypes = PropTypes.contextTypes;
    static propTypes = {
        path: PropTypes.path
    }

    constructor(props, context, ...rest) {
        super(props, context, ...rest);
        this.schema = makeSchema(context.loader);
//        context.loader.addSchema('FieldSetSchema', makeSchema(context.loader));
    }

    render() {
        return <ObjectType schema={this.schema} path={this.props.path}/>

    }
}

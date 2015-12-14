"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes, loaderFactory, types,decorators, DefaultLoader} from 'Subschema';

var ObjectType = types.Object;

var schema = {
    schema: {
        schema: {
            type: 'Mixed',
            labelKey: 'help',
            valueType: {
                type: 'TypeBuilder'
            },
            createTemplate: 'ModalCreateTemplate',
            canAdd: true,
            canEdit: true,
            canRemove: true
        },
        fieldsets: {
            type: 'List',
            canAdd: true,
            canEdit: true,
            canRemove: true,
            canReorder: true,
            itemType: {
                type: 'Object',
                subSchema: {
                    legend: 'Text',
                    fields: {
                        type: 'List',
                        canAdd: true,
                        canEdit: true,
                        canRemove: true,
                        canReorder: true,
                        itemType: {
                            type: 'ExpressionSelect',
                            options: '_allFields'
                        }
                    }
                },
                fields: ['legend', 'fields']
            }
        }
    },
    fieldsets: [{
        legend: 'Schema Builder', fields: ['schema', //'fieldsets'
        ]
    }]
};


export default class SchemaBuilderType extends Component {
    static contextTypes = ObjectType.contextTypes;
    static propTypes = ObjectType.propTypes;

    render() {
        var {valueManager, loader, ...rest} = this.props;
        return <ObjectType {...rest} schema={schema}/>

    }
}
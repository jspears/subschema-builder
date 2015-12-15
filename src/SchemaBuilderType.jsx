"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes,  loaderFactory, ValueManager, types,decorators, DefaultLoader} from 'Subschema';
import defaults from 'lodash/object/defaults';
//var {listen} = decorators;

var ObjectType = types.Object;

var schema = {
    schema: {
        name: {
            type: 'Text'
        },
        schema: {
            type: 'Mixed',
            template: false,
            labelKey: 'type',
            valueType: {
                type: 'TypeBuilder'
            },
            contentTemplate: 'ContentTypeTemplate',
            createTemplate: 'ModalCreateTemplate',
            canAdd: true,
            canEdit: true,
            canDelete: true
        }
    },
    fieldsets: {fields: ['schema']}
};

export default class SchemaBuilderType extends Component {
    static contextTypes = ObjectType.contextTypes;
    static propTypes = ObjectType.propTypes;

    render() {
        var {valueManager,className, nested, loader, ...rest} = this.props;

        return <ObjectType {...rest} className='form-group' schema={schema}
        />

    }
}
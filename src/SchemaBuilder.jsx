"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes,  loaderFactory, ValueManager, types,decorators, DefaultLoader} from 'Subschema';
import defaults from 'lodash/object/defaults';
//var {listen} = decorators;

var {Mixed} = types;
var ObjectType = types.Object;

var mixed = {
    addButton: {label: 'Add Property', className: "btn btn-default add-btn"},
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
var schema = {
    schema: {
        schema: {
            type: 'Mixed',
            addButton: {label: 'Add Property', className: "btn btn-default add-btn"},

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

export default class SchemaBuilderType extends Mixed {
   // static contextTypes = Mixed.contextTypes;
   // static propTypes = Mixed.propTypes;
    static propTypes = Mixed.propTypes;
    static defaultProps = defaults(mixed, Mixed.defaultProps);
    static inputClassName = ' ';
    static template = false;
    static noTemplate = true;

/*    render() {
        var {className, props, ...rest} = this.props;
        console.log('SchemaBuilderType', rest.value);
        return <Mixed {...rest}  className='form-group'/>

    }*/
}
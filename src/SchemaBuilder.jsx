"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes,  loaderFactory, ValueManager, types,decorators, DefaultLoader} from 'Subschema';
import defaults from 'lodash/object/defaultsDeep';

var {Mixed} = types;
export default class SchemaBuilder extends Mixed {
    static propTypes = Mixed.propTypes;
    static defaultProps = defaults({
        addButton: {label: 'Add Property', className: "btn btn-default add-btn"},
        labelKey: 'type',
        itemType: {
            type: 'TypeBuilder'
        },
        contentTemplate: 'ContentTypeTemplate',
        createTemplate: 'ModalCreateTemplate',
        canAdd: true,
        canEdit: true,
        canDelete: true
    }, Mixed.defaultProps);
}
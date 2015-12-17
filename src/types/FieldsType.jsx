"use strict";

import React, {Component} from 'react';
import Subschema, {types, PropTypes,tutils, decorators} from 'Subschema';
import defaults from '../../node_modules/lodash/object/defaultsDeep';
var {List} = types;

export default class Fields extends List {
    static defaultProps = defaults({
        addButton: {label: 'Add Field', className: "btn btn-default add-btn"},
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canReorder: true,
        labelKey: '',
        itemType: {
            type: 'ExpressionSelect',
            optionsPath: '_allFields'
        }
    }, List.defaultProps);
    static template = {
        className: 'form-group'
    }

}
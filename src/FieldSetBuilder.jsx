"use strict";

import React, {Component} from 'react';
import Subschema, {loaderFactory, DefaultLoader, decorators, tutils, types, PropTypes, ValueManager} from 'Subschema';
import defaults from 'lodash/object/defaults'
var ObjectType = types.Object;
var {List} = types;
var {listen} =decorators;
var {path} = tutils;

var FieldSetSchema = {
    legend: {
        type: 'InputFalse',
        help: 'The legend for this fieldset'
    },
    template: {
        type: 'ExpressionSelect',
        optionsPath: "_templates",
        defaultValue: 'FieldSetTemplate',
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
        addButton: {label: 'Add Field', className: "btn btn-default add-btn"},
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

var fieldsets = {
    labelKey: 'legend',
    canEdit: true,
    canReorder: true,
    canDelete: true,
    canAdd: true,
    template: false,
    addButton: {label: 'Add Fieldset', className: "btn btn-default add-btn"},
    itemType: {
        type: 'Object',
        subSchema: FieldSetSchema
    },
    contentTemplate: 'ContentTypeTemplate',
    createTemplate: 'ModalCreateTemplate'
}

function allFields(oschema, ppath, fields) {
    fields = fields || [];
    if (!oschema) return fields;
    var schema = oschema.schema || oschema.subSchema;
    if (schema) {
        var keys = Object.keys(schema);
        fields.push.apply(fields, keys.map(p=>path(ppath, p)));
        keys.forEach(function (key) {
            allFields(schema[key].subSchema, path(ppath, key), fields);
        })
    }

    return fields;
}
function usedFields(oschema, ppath, fields) {
    fields = fields || [];
    if (!oschema) return fields;
    if (!oschema.fieldsets) return fields;
    oschema.fieldsets.forEach(f, k=> {
        fields.push.apply(fields, f.fields);
        if (f.fieldsets) {
            usedFields(f, path(ppath, k), fields);
        }
    });
    return fields;
}
function toFields(schema, _all) {
    if (schema == null) return _all;
    _all = _all || allFields(schema);
    var _used = usedFields(schema);
    _all = _all.filter(v=>_used.indexOf(v) > -1);
    return _used.concat(all);
}
export default class FieldSetBuilder extends List {

    static inputClassName = ' ';
    static template = false;
    static noTemplate = true;
    static propTypes = List.propTypes;
    static defaultProps = defaults(fieldsets, List.defaultProps);

    @listen("value", ".schema")
    setSchema(schema) {
        var fields = schema ? Object.keys(schema) : [];
        this.setState({schema, fields});
        var _all = allFields({schema});
        console.log('_all', _all);
        this.context.valueManager.update('_allFields', toFields(this.state && this.state.schema || null, _all));
    }

}

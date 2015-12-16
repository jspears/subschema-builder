"use strict";
import Subschema, {tutils} from 'Subschema';
import each from 'lodash/collection/each';

var {toArray, isString} = tutils;

export function normalizeFieldsets(fieldset) {
    var {fields, fieldsets, ...rest} = fieldset;
    if (fields != null) {
        rest.fields = toArray(fields);
    } else if (fieldsets != null) {
        rest.fieldsets = toArray(fieldsets).map(normalizeFieldsets);
    }
    return rest;
}
function normalizeField(loader, field) {
    var {template, options, fieldsets, fields, subSchema, validators, ...copy} = field;
    if (template == null && options == null && fieldsets == null && subSchema == null && validators == null) {
        return field;
    }
    switch (typeof template) {
        case 'boolean':
        case 'string':
            copy.template = {template};
            break;
    }

    if (validators != null) {
        copy.validators = toArray(validators).map(function (type) {
            if (isString(type)) {
                return {
                    type
                }
            }
            return type;
        });
    }

    if (options != null) {
        copy.options = toArray(options).map((v)=> {
            if (isString(v)) {
                return {
                    label: v,
                    val: v
                }
            }
            var {label, val, ...rest} = v;
            rest.label = label == null ? val : label;
            rest.val = val == null ? label : val;
            return rest;
        })
    }

    if (subSchema != null) {
        if (fieldsets != null) {
            fieldsets = toArray(fieldsets).map(normalizeFieldsets);
            subSchema = {
                schema: subSchema,
                fieldsets
            }
        } else if (fields != null) {
            fieldsets = [{fields: toArray(fields)}];
            subSchema = {
                schema: subSchema,
                fieldsets
            }
        }
        copy.subSchema = normalizeSchema(loader, subSchema).subSchema;
    }

    return copy;
}
export default function normalizeSchema(loader, oschema) {
    if (oschema == null) {
        return {};
    }
    if (isString(oschema)) {
        return normalizeSchema(loader, {subSchema: loader.loadSchema(oschema)});
    }
    var {subSchema, schema, fields, fieldsets, ...copy} =  oschema;
    schema = subSchema || schema;
    if (isString(schema)) {
        copy.subSchema = loader.loadSchema(schema);
        copy.fields = fields;
        copy.fieldsets = fieldsets;
        return normalizeSchema(loader, copy);
    }
    if (schema) {
        if (fields) {
            copy.subSchema = {
                schema,
                fieldsets: [{fields: fields}]
            }
        } else if (fieldsets) {
            copy.subSchema = {
                schema,
                fieldsets: toArray(fieldsets).map(normalizeFieldsets)
            }
        } else {
            copy.subSchema = {
                fieldsets: [{fields: Object.keys(schema)}],
                schema
            }
        }
        each(schema, (field, key)=> {
            schema[key] = normalizeField(loader, field, key);
        });

    } else {
        //if no fields or fieldsets, we assume the whole thing is the schema.
        return normalizeSchema(loader, {subSchema: oschema});
    }
    return copy;
}
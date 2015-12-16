"use strict";
import React, {Component} from 'react';
import Subschema, {decorators,types,Form, PropTypes,DefaultLoader, ValueManager, loaderFactory} from 'Subschema';
import defaults from 'lodash/object/defaults';
import normalizeSchema from '../src/normalize';

var {listen} = decorators;

export default class SchemaSelect extends Component {
    static contextTypes = defaults({
        origLoader: PropTypes.loader
    }, PropTypes.contextTypes);

    @listen("value", "schemaName", true)
    select(schemaName) {
        this.setState({schemaName})
        var builder;
        if (schemaName) {
            builder = this.context.origLoader.loadSchema(schemaName);
        }
        var schema = normalizeSchema(this.context.origLoader, builder).subSchema || {};
        this.context.valueManager.update('schema', schema.schema);
        this.context.valueManager.update('fieldsets', schema.fieldsets);
    }

    render() {
        return <i className="selected-schema">Editing: {this.state.schemaName  || 'Untitled Schema'}</i>
    }
}
"use strict";
import React, {Component} from 'react';
import Subschema, {decorators} from 'Subschema';

var {listen} = decorators;

export default class SchemaView extends Component {
    @listen("value", null)
    setSchema(schema) {
        var {_templates,_types, _processors, _validators, _allFields, _operators, ...rest } = schema;
        this.setState({schema: rest});
    }

    render() {
        return <pre>{JSON.stringify(this.state.schema, null, 3)}</pre>
    }

}
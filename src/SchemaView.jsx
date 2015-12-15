"use strict";
import React, {Component} from 'react';
import Subschema, {decorators} from 'Subschema';

var {listen} = decorators;

export default class SchemaView extends Component {
    @listen("value", null)
    setSchema(schema) {
        var {_templates,_types, _processors, _validators, _allFields, _operators, ...rest } = schema;
        this.setState({schema: rest});
        this.forceUpdate();
    }
    handleClick = (e)=>{
        e && e.preventDefault();
        this.setSchema(this.context.valueManager.getValue());
    }
    render() {
        return <pre onClick={this.handleClick}>{JSON.stringify(this.state.schema, null, 3)}</pre>
    }

}
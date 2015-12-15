"use strict";
import React, {Component} from 'react';
import Subschema, {decorators} from 'Subschema';

var {listen} = decorators;

export default class SchemaView extends Component {
    @listen("value", "schema")
    setSchema(schema) {
        this.setState({schema});
    }
    handleClick = (e)=>{
        e && e.preventDefault();
        this.setSchema(this.context.valueManager.getValue());
    }
    render() {
        return <pre onClick={this.handleClick}>{JSON.stringify(this.state.schema, null, 3)}</pre>
    }

}
"use strict";
import React, {Component} from 'react';
import Subschema, {Form, decorators} from 'Subschema';
var {listen} = decorators;

export default class Preview extends Component {
    @listen("value", "schema")
    setSchema(schema) {
        this.setState({schema});
    }

    render() {
        return <Form schema={this.state.schema}/>
    }
}
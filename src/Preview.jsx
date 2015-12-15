"use strict";
import React, {Component} from 'react';
import Subschema, {Form, decorators} from 'Subschema';

var {listen} = decorators;

class JsonView extends Component {

    render() {
        return <pre>{JSON.stringify(this.props.schema, null, 3)}</pre>
    }
}
export default class Preview extends Component {
    handleClick = (e)=> {
        e && e.preventDefault();
        this.setState({
            current: e.target.value
        })
    }

    constructor(...rest) {
        super(...rest);
        this.state = {
            current: 'schema'
        }
    }

    @listen("value", "fieldsets")
    setFieldsets(fieldsets) {
        this.makeSchema();
    }

    @listen("value", "schema")
    setSchema(schema) {
        this.makeSchema();
    }

    makeSchema() {
        var value = this.context.valueManager.getValue();
        var {fieldsets, schema} = value;

        this.setState({schema: {fieldsets, schema}});
        console.log('schema', this.state.schema);
    }

    render() {
        return <fieldset className="subschema-preview nav-preview">
            <legend>Preview</legend>
            <ul id="myTabs" className="nav nav-tabs" role="tablist">
                <li role="presentation" className={this.state.current !== 'json' ? 'active' :''}>
                    <button value="form" role="tab" id="profile-tab" data-toggle="tab" onClick={this.handleClick}
                            aria-controls="profile" aria-expanded="false">Schema
                    </button>
                </li>
                <li role="presentation" className={this.state.current === 'json' ? 'active' :''}>
                    <button value="json" id="home-tab" role="tab" data-toggle="tab" onClick={this.handleClick}
                            aria-controls="schema" aria-expanded="true">JSON
                    </button>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div role="tabpanel" className="tab-pane fade active in" id="home" aria-labelledby="home-tab">
                    {this.state.current === 'json' ? <JsonView key="json" schema={this.state.schema}/> : <Form
                        schema={this.state.schema}
                        key="schema"/>}

                </div>

            </div>

        </fieldset>
    }
}
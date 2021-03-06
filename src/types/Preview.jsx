"use strict";
import React, {Component} from 'react';
import Subschema, {PropTypes, Form, decorators} from 'Subschema';

var {listen} = decorators;

class JsonView extends Component {

    render() {
        return <pre>{JSON.stringify(this.props.schema, null, 3)+''}</pre>
    }
}
export default class Preview extends Component {
    static defaultProps = {
        fieldsets: "fieldsets",
        schema: "schema"
    }
    static propTypes = {
        fieldsets: PropTypes.listener,
        schema: PropTypes.listener
    }
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

    makeSchema() {
        var {fieldsets, schema} = this.props;

        return {fieldsets, schema};
    }

    render() {
        var schema = this.makeSchema();
        return <fieldset className="subschema-preview nav-preview">
            <legend>Preview</legend>
            <ul id="myTabs" className="nav nav-tabs" role="tablist">
                <li role="presentation" className={this.state.current !== 'json' ? 'active' :''}>
                    <button value="form" role="tab" id="profile-tab" data-toggle="tab" onClick={this.handleClick}
                            aria-controls="profile" aria-expanded="false">Form
                    </button>
                </li>
                <li role="presentation" className={this.state.current === 'json' ? 'active' :''}>
                    <button value="json" id="home-tab" role="tab" data-toggle="tab" onClick={this.handleClick}
                            aria-controls="schema" aria-expanded="true">Schema
                    </button>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div role="tabpanel" className="tab-pane fade active in" id="home" aria-labelledby="home-tab">
                    {this.state.current === 'json' ? <JsonView key="json" schema={schema}/> : <Form
                        schema={schema}
                        key="schema"/>}

                </div>

            </div>

        </fieldset>
    }
}
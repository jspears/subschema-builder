"use strict";
import React, {Component} from 'react';
import Subschema, {Form, decorators} from 'Subschema';
import PreviewSchema from './PreviewSchema.jsx';
import SchemaView from './SchemaView.jsx'
var {listen} = decorators;

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

    render() {
        return <div className="nav-preview">
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
                    {this.state.current === 'json' ? <SchemaView key="json"/> : <PreviewSchema key="schema"/>}

                </div>

            </div>

        </div>
    }
}
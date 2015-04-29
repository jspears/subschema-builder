"use strict";

var React = require('react');
var loader = require('subschema').loader;

var OrTypeTemplate = React.createClass({
    getInitialState(){
        return {
            value: this.props.value
        }
    },
    handleChange(value){
        this.props.onSelect(value);
        this.refs.select.setValue(value);
    },

    render(){
        var Select = loader.loadType('Select');
        var options = this.props.options;
        return <div>
            <Select field={{options}} onValueChange={this.handleChange} value={this.props.value} ref="select"/>
            {this.props.children}
        </div>
    }
});
module.exports = OrTypeTemplate;
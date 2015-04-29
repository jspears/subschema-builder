"use strict";

var React = require('react');
var {util, Editor, loader, ValueManager} = require('subschema');
var ObjectType = loader.loadType('Object');

/**
 *
 * The Or Type is special it actually works a level
 * higher than it is described.  This allows for
 * root schemas to have ors in them.  Otherwise only
 * nested objects would be able to or.
 *
 * It will render the keys as types...
 */
var OrType = React.createClass({
    getInitialState(){
        return {
            description: '',
            schema: null,
            path: this.findPath(),
            data: {}
        }
    },
    getDefaultProps(){
        return {
            pleaseSelectText: 'Please Select an option',
            template: 'OrTypeTemplate',
            typeField:'type'
        }
    },
    handleValue(value){
        if (!this.state.path) return;
        this.updatePath(null, value);
    },

    handleSelect(value){
        var subSchema = this.props.field.subSchema, current = this.state.path;
        var field = subSchema[value], data;
        if (value !== current) {
            this.state.data[current] = this.props.valueManager.path(current);
            this.updatePath(current, void(0));
            this.updatePath(value, {value: this.state.data[value]});
        }
        if (this.props.typeField) {
            this.updatePath(this.currentPath(this.props.typeField), {value});
        }
        //This should listen to changes and tehn set changes
        //  this.valueManager.setValue(this.props.valueManager.path(this.currentPath(value)));
        var obj = {value:field}
        this.setState({
            path: value,
            schema: field
        });
    },
    handleChange(value){

        this.props.valueManager.update(this.currentPath(), value && value.value);
    },
    currentPath(path){
        path = path || this.state.path || this.findPath();
        var parts = this.props.path.split('.');
        //remove the current options path.
        parts.pop();
       // return util.path(parts.join('.'), path);
    },
    //try to figure out the path if it exists in the data.
    //It may return undefined if there has been no default set.
    findPath(){
        var values = this.props.valueManager.path(this.popPath()), keys = this.keys(), i = 0, l = keys.length;
        for (; i < l; i++) {
            if (keys[i] in values) {
                return keys[i];
            }
        }

    },
    updatePath(path, value){
        //update the value manager.
        this.props.valueManager.update(
            this.currentPath(path), value && value.value);
    },
    keys(){
        var field = this.props.field;
        var subSchema = field.fields || field.subSchema;
        return Object.keys(subSchema);
    },
    makeOptions(){
        var field = this.props.field;
        var subSchema = field.fields || field.subSchema;
        return this.keys().map(function (v) {

            return {
                label: subSchema[v] && subSchema[v].title || v,
                val: v
            }
        });
    },
    popPath(){
        var parts = this.props.path.split('.');
        parts.pop();
        return parts.join('.');
    },
    render(){
        var Template = loader.loadTemplate(this.props.field.template || this.props.template);
        var path = this.popPath(), schema = this.state.schema;
        return <Template path={path} options={this.makeOptions()} onSelect={this.handleSelect}
                         value={this.state.path}>
            {this.state.schema ?
                <ObjectType path={path} valueManager={this.props.valueManager}
                            onValueChange={this.handleChange}
                            field={{schema}}/> : null}
        </Template>
    }
});
module.exports = OrType;
"use strict";

var React = require('react');
var {Form} = require('subschema')
var Tabs = require('../src/SimpleTabs.jsx');
var mixins = [{
    componentWillMount(){
        this.props.valueManager.addListener(null, this.updateValue, this, true);
    },
    componentWillUnmount(){
        this.props.valueManager.removeListener(null, this.updateValue);
    },
    updateValue(value){
        this.setState({value});
    }
}];

var JsonView = React.createClass({
    mixins,
    render(){
        return <pre>{JSON.stringify(this.props.valueManager.getValue(), null, 2)}</pre>
    }
});
var FormView = React.createClass({
    mixins,
    render(){
        return <Form schema={this.state.value} valueManager={this.props.dataValueManager}/>
    }
});

var SubschemaTabs = React.createClass({
    componentWillMount(){
        var valueManager = this.props.valueManager, dataValueManager = this.props.dataValueManager;
        this.tabs = [
            {title: 'Schema', view: JsonView, props: {valueManager: valueManager}},
            {title: 'Form', view: FormView, props: {dataValueManager: dataValueManager, valueManager: valueManager}},
            {title: 'Form Data', view: JsonView, props: {valueManager: dataValueManager}}
        ]
    },
    render(){
        return <Tabs tabs={this.tabs}/>
    }
});
module.exports = SubschemaTabs;
"use strict";


var React = require('react');
var SchemaBuilder = require('../src/SubschemaBuilder.jsx');
var ValueManager = require('subschema').ValueManager;
var SubschemaTabs = require('../src/SubschemaTabs.jsx');

require('./Builder.less');

var Builder = React.createClass({
    getDefaultProps(){
        return {
            dataValueManager: ValueManager(),
            valueManager: ValueManager()
        }
    },

    render(){
        var {children, ...props} = this.props

        return <div>
            <h3>Schema Builder</h3>
            {children}
            <SchemaBuilder {...props}/>
            <SubschemaTabs {...props}/>
        </div>
    }
});
module.exports = Builder;
"use strict";

var React = require('react');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var SimpleTabs = React.createClass({
    getDefaultProps(){
        return {
            tabs: []
        }
    },
    getInitialState(){
        return {
            activeKey: this.props.activeKey || 0
        }
    },
    handleSelect(activeKey){
        this.setState({activeKey});
    },
    renderTab(t, i){
        var {tabs, ...props} = this.props;

        var View = t.view;
        return <TabPane eventKey={i} tab={t.title} key={'tab-'+i}>
            <View  {...props} {...t.props}/>
        </TabPane>
    },
    render(){
        return <TabbedArea defaultActiveKey={this.state.activeKey}>
            {this.props.tabs.map(this.renderTab, this)}
        </TabbedArea>
    }
});

module.exports = SimpleTabs;
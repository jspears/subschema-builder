"use strict";

var React = require('react');
var {Nav,NavItem} = require('react-bootstrap');
var SimpleTabs = React.createClass({
    getDefaultProps(){
        return {
            activeKey: 0,
            bsStyle: 'tabs',
            justified: true,
            tabs: [],
            tabContainerClass: 'tab-container'
        }

    },
    getInitialState(){
        return {
            activeKey: this.props.activeKey
        }
    },
    handleSelect(activeKey){
        this.setState({activeKey});
    },

    render(){
        var {valueManager, tabs, ...props} = this.props;
        var tab = tabs[this.state.activeKey];
        var TabView = tab.view;

        return <div>
            <Nav  {...props} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                {tabs.map((t, i)=>(
                    <NavItem eventKey={i} {...t.props}>{t.title}</NavItem>
                ))}
            </Nav>

            <div className={this.props.tabContainerClass}>
                <TabView {...props} {...tab.props}/>
            </div>
        </div>
    }
});

module.exports = SimpleTabs;